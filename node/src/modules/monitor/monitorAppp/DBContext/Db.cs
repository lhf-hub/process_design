using Microsoft.EntityFrameworkCore;

namespace monitorAppp.DBContext
{
    public class Db: DbContext
    {
        public DbSet<Model.Monitor> monitors { get; set; }

        public Db(DbContextOptions<Db> options) : base(options)
        {
        }

    }
}
