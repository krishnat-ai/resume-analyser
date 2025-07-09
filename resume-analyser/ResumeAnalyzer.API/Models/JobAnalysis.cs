namespace ResumeAnalyzer.API.Models
{
    public class JobAnalysis
    {
        public int Id { get; set; }
        public string JobTitle { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Salary { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public List<string> RequiredSkills { get; set; } = new();
        public List<string> PreferredSkills { get; set; } = new();
        public List<string> Responsibilities { get; set; } = new();
        public JobInsights Insights { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class JobInsights
    {
        public int Id { get; set; }
        public string Difficulty { get; set; } = string.Empty;
        public string MarketDemand { get; set; } = string.Empty;
        public string GrowthPotential { get; set; } = string.Empty;
        public string CompetitionLevel { get; set; } = string.Empty;
        public int JobAnalysisId { get; set; }
        public JobAnalysis JobAnalysis { get; set; } = null!;
    }
} 