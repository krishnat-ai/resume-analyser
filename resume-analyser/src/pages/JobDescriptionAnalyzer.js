import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Target, 
  Users, 
  Clock, 
  MapPin,
  DollarSign,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Download,
  Copy
} from 'lucide-react';

const JobDescriptionAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        jobTitle: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA (Hybrid)',
        salary: '$120,000 - $150,000',
        experience: '5+ years',
        requirements: {
          required: [
            'Bachelor\'s degree in Computer Science or related field',
            '5+ years of experience in software development',
            'Proficiency in JavaScript, React, and Node.js',
            'Experience with cloud platforms (AWS, Azure, or GCP)',
            'Strong understanding of database design and SQL',
            'Experience with version control systems (Git)',
            'Excellent problem-solving and analytical skills'
          ],
          preferred: [
            'Master\'s degree in Computer Science',
            'Experience with TypeScript and GraphQL',
            'Knowledge of containerization (Docker, Kubernetes)',
            'Experience with CI/CD pipelines',
            'Understanding of microservices architecture',
            'Previous experience in fintech or e-commerce'
          ]
        },
        responsibilities: [
          'Design and develop scalable web applications',
          'Collaborate with cross-functional teams to define features',
          'Write clean, maintainable, and efficient code',
          'Participate in code reviews and technical discussions',
          'Mentor junior developers and provide technical guidance',
          'Contribute to architectural decisions and system design',
          'Stay up-to-date with emerging technologies and best practices'
        ],
        skills: {
          technical: [
            'JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL',
            'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'
          ],
          soft: [
            'Leadership', 'Communication', 'Problem Solving',
            'Team Collaboration', 'Time Management'
          ]
        },
        insights: {
          difficulty: 'High',
          marketDemand: 'Very High',
          growthPotential: 'Excellent',
          competitionLevel: 'Moderate'
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearAnalysis = () => {
    setJobDescription('');
    setAnalysisResult(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Description Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paste a job description and get detailed insights about requirements, 
            responsibilities, and market analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Search className="w-6 h-6 mr-2 text-purple-600" />
              Job Description Input
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Analyze Job Description</span>
                    </>
                  )}
                </button>
                <button
                  onClick={clearAnalysis}
                  className="btn-secondary"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Analysis Features</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Extract key requirements and qualifications</li>
                <li>• Identify required vs preferred skills</li>
                <li>• Analyze job responsibilities</li>
                <li>• Market demand and competition insights</li>
              </ul>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-green-600" />
              Analysis Results
            </h2>

            {!analysisResult ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Paste a job description and click analyze to see the results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Job Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{analysisResult.jobTitle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>{analysisResult.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{analysisResult.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      <span>{analysisResult.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{analysisResult.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Required Skills
                      </h4>
                      <ul className="space-y-1">
                        {analysisResult.requirements.required.map((req, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Preferred Skills
                      </h4>
                      <ul className="space-y-1">
                        {analysisResult.requirements.preferred.map((pref, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Technical Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.technical.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.soft.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Market Insights
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Difficulty Level</div>
                      <div className="font-semibold text-gray-900">{analysisResult.insights.difficulty}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Market Demand</div>
                      <div className="font-semibold text-gray-900">{analysisResult.insights.marketDemand}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Growth Potential</div>
                      <div className="font-semibold text-gray-900">{analysisResult.insights.growthPotential}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Competition</div>
                      <div className="font-semibold text-gray-900">{analysisResult.insights.competitionLevel}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 flex space-x-3">
                  <button className="btn-secondary flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button 
                    onClick={() => copyToClipboard(JSON.stringify(analysisResult, null, 2))}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Results</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionAnalyzer; 