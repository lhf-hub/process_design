
using System.Drawing;
using System.Drawing.Imaging;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using monitorAppp;
using monitorAppp.DBContext;
using MySqlConnector;

class Program
{


    private static Timer? screenshotTimer;
    private static bool keepRunning = true;


    static void Main(string[] args)
    {


        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        builder.Services.AddCors(setup =>
        {
            setup.AddPolicy(name: "policy1", builder =>
            {
                builder.WithOrigins("http://localhost:7214", "http://localhost:8080")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        

        var configuration = builder.Configuration;
        var connectionString = configuration.GetConnectionString("MySQL");

        // 注册数据库上下文服务
        builder.Services.AddDbContext<Db>(options =>
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
        var app = builder.Build();

        

        app.UseCors("policy1");
        app.UseStaticFiles();
        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        

        screenshotTimer = new Timer(TimerCallback, null, 0, 10000); // 设置定时器间隔为10秒。方便答辩
        Console.WriteLine("按Ctrl+C退出");

/*        Console.CancelKeyPress += delegate (object? sender, ConsoleCancelEventArgs e)
        {
            e.Cancel = true;
            keepRunning = false;
        };

        while (keepRunning)
        {
            Thread.Sleep(1000); // 让主线程每秒检查一次是否需要退出
        }*/

        // 隐藏
        app.Run();
    }





    static void TimerCallback(object? state)
    {
        TakeScreenshot(null, EventArgs.Empty);
    }


    static void TakeScreenshot(object? sender, EventArgs e)
    {
        if (Common.employee_id == null || Common.employee_id == "undefined")
        {
           /* Console.WriteLine("employee_id为空11");*/
            return;
        }
/*        Console.WriteLine("employee_id不为空");*/

        // 创建一个新的位图
        Bitmap bitmap = ScreenshotFull();
        try
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // 将位图保存到内存流中
                bitmap.Save(memoryStream, ImageFormat.Png);

                // 将内存流转换为字节数组
                byte[] blob = memoryStream.ToArray();

                // 将字节数组插入到数据库
                InsertScreenshotPathToDatabase(blob);
            }
        }
        catch (System.Exception err)
        {
            Console.WriteLine(err);
            Console.WriteLine("保存截图失败");
        }

    }

    static Bitmap ScreenshotFull()
    {
        if (Common.employee_id == null || Common.employee_id == "undefined")
        {
           /* Console.WriteLine("employee_id为空11");*/
            return null;
        }
        Bitmap bmp = null;
        try
        {
            bmp = new Bitmap(1920,1080);

            using (Graphics g = Graphics.FromImage(bmp))
            {
                g.CopyFromScreen(new Point(0, 0), new Point(0, 0), bmp.Size);
            }
        }
        catch (Exception ex)
        {
            // 打印错误信息
            Console.WriteLine("Error: " + ex.Message);
        }

        return bmp;
    }

    static void InsertScreenshotPathToDatabase(byte[] blob)
    {
        if (Common.employee_id == null || Common.employee_id == "undefined")
        {
            /*Console.WriteLine("employee_id为空11");*/
            return;
        }
        string employee_id = Common.employee_id;
/*        Console.WriteLine(employee_id);*/
        //与数据库连接的信息
        MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            //数据库连接时的用户名
            UserID = "root",
            //数据库连接时的密码
            Password = "lhf20040208",
            //数据库连接时的服务器地址
            Server = "localhost",
            //要连接的数据库
            Database = "lastest_process"
        };
        //定义与数据连接的链接
        MySqlConnection conn = new MySqlConnection(builder.ConnectionString);
        //打开这个链接
        conn.Open();

        using MySqlCommand command = new MySqlCommand("INSERT INTO monitor (id, employee_id, shot_blob, datetime) VALUES (@id, @employee_id, @shot_blob, @datetime)", conn);
        command.Parameters.AddWithValue("@id", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

        command.Parameters.AddWithValue("@employee_id", employee_id);
        command.Parameters.AddWithValue("@shot_blob", blob);
        command.Parameters.AddWithValue("@datetime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        // 输出插入语句
        Console.WriteLine(command.CommandText);
        try
        {
            command.ExecuteNonQuery();
        }
        catch (System.Exception err)
        {
            Console.WriteLine(err);
            Console.WriteLine("插入截图到数据库失败");
        }
        finally
        {
            conn.Close();
        }

    }

}