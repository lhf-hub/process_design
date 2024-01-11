
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

        // ע�����ݿ������ķ���
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

        

        screenshotTimer = new Timer(TimerCallback, null, 0, 10000); // ���ö�ʱ�����Ϊ10�롣������
        Console.WriteLine("��Ctrl+C�˳�");

/*        Console.CancelKeyPress += delegate (object? sender, ConsoleCancelEventArgs e)
        {
            e.Cancel = true;
            keepRunning = false;
        };

        while (keepRunning)
        {
            Thread.Sleep(1000); // �����߳�ÿ����һ���Ƿ���Ҫ�˳�
        }*/

        // ����
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
           /* Console.WriteLine("employee_idΪ��11");*/
            return;
        }
/*        Console.WriteLine("employee_id��Ϊ��");*/

        // ����һ���µ�λͼ
        Bitmap bitmap = ScreenshotFull();
        try
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // ��λͼ���浽�ڴ�����
                bitmap.Save(memoryStream, ImageFormat.Png);

                // ���ڴ���ת��Ϊ�ֽ�����
                byte[] blob = memoryStream.ToArray();

                // ���ֽ�������뵽���ݿ�
                InsertScreenshotPathToDatabase(blob);
            }
        }
        catch (System.Exception err)
        {
            Console.WriteLine(err);
            Console.WriteLine("�����ͼʧ��");
        }

    }

    static Bitmap ScreenshotFull()
    {
        if (Common.employee_id == null || Common.employee_id == "undefined")
        {
           /* Console.WriteLine("employee_idΪ��11");*/
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
            // ��ӡ������Ϣ
            Console.WriteLine("Error: " + ex.Message);
        }

        return bmp;
    }

    static void InsertScreenshotPathToDatabase(byte[] blob)
    {
        if (Common.employee_id == null || Common.employee_id == "undefined")
        {
            /*Console.WriteLine("employee_idΪ��11");*/
            return;
        }
        string employee_id = Common.employee_id;
/*        Console.WriteLine(employee_id);*/
        //�����ݿ����ӵ���Ϣ
        MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            //���ݿ�����ʱ���û���
            UserID = "root",
            //���ݿ�����ʱ������
            Password = "lhf20040208",
            //���ݿ�����ʱ�ķ�������ַ
            Server = "localhost",
            //Ҫ���ӵ����ݿ�
            Database = "lastest_process"
        };
        //�������������ӵ�����
        MySqlConnection conn = new MySqlConnection(builder.ConnectionString);
        //���������
        conn.Open();

        using MySqlCommand command = new MySqlCommand("INSERT INTO monitor (id, employee_id, shot_blob, datetime) VALUES (@id, @employee_id, @shot_blob, @datetime)", conn);
        command.Parameters.AddWithValue("@id", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

        command.Parameters.AddWithValue("@employee_id", employee_id);
        command.Parameters.AddWithValue("@shot_blob", blob);
        command.Parameters.AddWithValue("@datetime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        // ����������
        Console.WriteLine(command.CommandText);
        try
        {
            command.ExecuteNonQuery();
        }
        catch (System.Exception err)
        {
            Console.WriteLine(err);
            Console.WriteLine("�����ͼ�����ݿ�ʧ��");
        }
        finally
        {
            conn.Close();
        }

    }

}