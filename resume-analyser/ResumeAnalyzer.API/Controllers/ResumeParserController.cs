using Microsoft.AspNetCore.Mvc;
using ResumeAnalyzer.API.Services;
using ResumeAnalyzer.API.Models;

namespace ResumeAnalyzer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeParserController : ControllerBase
    {
        private readonly IResumeParserService _resumeParserService;

        public ResumeParserController(IResumeParserService resumeParserService)
        {
            _resumeParserService = resumeParserService;
        }

        [HttpPost("parse")]
        public async Task<ActionResult<ResumeAnalysis>> ParseResume(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            // Validate file type
            var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest("Invalid file type. Only PDF, DOC, and DOCX files are allowed.");
            }

            try
            {
                var analysis = await _resumeParserService.ParseResumeAsync(file);
                return Ok(analysis);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResumeAnalysis>> GetResumeAnalysis(int id)
        {
            var analysis = await _resumeParserService.GetResumeAnalysisAsync(id);
            
            if (analysis == null)
            {
                return NotFound();
            }

            return Ok(analysis);
        }

        [HttpGet]
        public async Task<ActionResult<List<ResumeAnalysis>>> GetAllResumeAnalyses()
        {
            var analyses = await _resumeParserService.GetAllResumeAnalysesAsync();
            return Ok(analyses);
        }
    }
} 