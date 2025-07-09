using ResumeAnalyzer.API.Models;

namespace ResumeAnalyzer.API.Services
{
    public interface IResumeParserService
    {
        Task<ResumeAnalysis> ParseResumeAsync(IFormFile file);
        Task<ResumeAnalysis?> GetResumeAnalysisAsync(int id);
        Task<List<ResumeAnalysis>> GetAllResumeAnalysesAsync();
    }
} 