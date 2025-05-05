using Microsoft.EntityFrameworkCore;
using eRecruitment.Models;

namespace eRecruitment.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Requisition> Requisitions { get; set; }
        public DbSet<CVBank> CVs { get; set; }
        public DbSet<Assessment> Assessments { get; set; } // ✅ Add Assessment table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<Requisition>().ToTable("recruitment");
            modelBuilder.Entity<CVBank>().ToTable("CVBank");
            modelBuilder.Entity<Assessment>().ToTable("Assessment");
        }
    }
}
