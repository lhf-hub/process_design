using Microsoft.AspNetCore.Mvc;
using monitorAppp.DBContext;
using System;
using System.Drawing;


namespace monitorAppp.Controllers
{    public class MyObject
    {
        public string id { get; set; }
        public string base64 { get; set; }

        public MyObject(string id, string base64)
        {
            this.id = id;
            this.base64 = base64;
        }
    }
    [ApiController]
    [Route("[controller]")]


    public class MonitorController : Controller
    {
        private readonly Db _db;
        public MonitorController(Db db)
        {
            _db = db;
        }
        [HttpPost("query")]
        public IActionResult GetImages([FromBody] ImageRequest request)
        {
            // 从数据库或其他地方获取图片数据
            var images = GetImagesFromDatabase(request.employee_id, request.dateRange);

            // 返回图片数据
            if (images == null)
            {
                return Json(new { code = 500, msg = "参数错误" });
            }
            return Json(new { code = 200, msg = "success", data = images });
        }

        [HttpGet("bind")]
        public IActionResult Bind([FromQuery] string employee_id)
        {
            Console.WriteLine("gadiusgdiua" + employee_id);
            Common.employee_id = employee_id;

            return Ok();
        }

        private MyObject[] GetImagesFromDatabase(string employeeId, int[] dateRange)
        {
            if (employeeId == null || dateRange == null)
            {
                return null;
            }
            var startDate = new DateTime(dateRange[0], dateRange[1], dateRange[2]);
            var endDate = new DateTime(dateRange[3], dateRange[4], dateRange[5]);

            var query = _db.monitors
                .Where(m => m.employee_id == employeeId
                && m.datetime >= startDate
                && m.datetime <= endDate)
                .ToList();
            List<MyObject> result = new List<MyObject>();
            foreach (var item in query)
            {
                // Convert the BLOB data to a Base64 string
                string base64 = Convert.ToBase64String(item.shot_blob);
                MyObject myObject = new MyObject(item?.id, base64);
                result.Add(myObject);
            }
            return result.ToArray();
        }

        public string ImageToBase64(Image image, System.Drawing.Imaging.ImageFormat format)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // 将图片保存到内存流中
                image.Save(ms, format);
                // 将内存流转换为字节数组
                byte[] imageBytes = ms.ToArray();
                // 将字节数组转换为 Base64 字符串
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
        }
    }



    public class ImageRequest
    {
        public string employee_id { get; set; }
        public int[] dateRange { get; set; }
    }

}
