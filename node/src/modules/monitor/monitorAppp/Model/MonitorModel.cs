using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace monitorAppp.Model
{
    [Table("monitor")]
    public class Monitor
    {
        [Key]
        public string? id{
            get;set;
        }
        public string? employee_id{
            get;set;
        }
        public DateTime? datetime
        {
            get;set;
        }

        public byte[]? shot_blob
        {
            get;set;
        }

    }
}
