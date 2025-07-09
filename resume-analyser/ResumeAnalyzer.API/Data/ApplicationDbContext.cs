using Microsoft.EntityFrameworkCore;
using ResumeAnalyzer.API.Models;

namespace ResumeAnalyzer.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ResumeAnalysis> ResumeAnalyses { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<JobAnalysis> JobAnalyses { get; set; }
        public DbSet<JobInsights> JobInsights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ResumeAnalysis
            modelBuilder.Entity<ResumeAnalysis>()
                .Property(r => r.Skills)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            modelBuilder.Entity<ResumeAnalysis>()
                .Property(r => r.Certifications)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            // Configure JobAnalysis
            modelBuilder.Entity<JobAnalysis>()
                .Property(j => j.RequiredSkills)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            modelBuilder.Entity<JobAnalysis>()
                .Property(j => j.PreferredSkills)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            modelBuilder.Entity<JobAnalysis>()
                .Property(j => j.Responsibilities)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            // Configure relationships
            modelBuilder.Entity<WorkExperience>()
                .HasOne(w => w.ResumeAnalysis)
                .WithMany(r => r.WorkExperience)
                .HasForeignKey(w => w.ResumeAnalysisId);

            modelBuilder.Entity<Education>()
                .HasOne(e => e.ResumeAnalysis)
                .WithMany(r => r.Education)
                .HasForeignKey(e => e.ResumeAnalysisId);

            modelBuilder.Entity<JobInsights>()
                .HasOne(i => i.JobAnalysis)
                .WithOne(j => j.Insights)
                .HasForeignKey<JobInsights>(i => i.JobAnalysisId);
        }
    }
} 