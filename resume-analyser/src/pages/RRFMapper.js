import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  FileText, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Download,
  Upload,
  Users,
  Award,
  Star,
  BarChart3
} from 'lucide-react';

const RRFMapper = () => {
  const [resumeData, setResumeData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [isMapping, setIsMapping] = useState(false);
  const [mappingResult, setMappingResult] = useState(null);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate resume parsing
      setTimeout(() => {
        setResumeData({
          name: 'John Doe',
          skills: [
            'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker',
            'MongoDB', 'PostgreSQL', 'Git', 'TypeScript', 'GraphQL'
          ],
          experience: [
            {
              title: 'Senior Software Engineer',
              company: 'TechCorp Inc.',
              duration: '2020 - Present',
              skills: ['React', 'Node.js', 'AWS', 'MongoDB']
            },
            {
              title: 'Software Engineer',
              company: 'StartupXYZ',
              duration: '2018 - 2020',
              skills: ['JavaScript', 'Python', 'Docker', 'PostgreSQL']
            }
          ],
          education: [
            {
              degree: 'Bachelor of Science in Computer Science',
              school: 'University of California',
              year: '2018'
            }
          ]
        });
      }, 1000);
    }
  };

  const handleJobInput = (event) => {
    const value = event.target.value;
    if (value.trim()) {
      // Simulate job analysis
      setTimeout(() => {
        setJobData({
          title: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          requiredSkills: [
            'JavaScript', 'React', 'Node.js', 'AWS', 'MongoDB',
            'TypeScript', 'GraphQL', 'Docker'
          ],
          preferredSkills: [
            'Python', 'Kubernetes', 'CI/CD', 'Microservices'
          ],
          experience: '5+ years',
          responsibilities: [
            'Design and develop scalable web applications',
            'Collaborate with cross-functional teams',
            'Mentor junior developers'
          ]
        });
      }, 1000);
    }
  };

  const handleMapping = async () => {
    if (!resumeData || !jobData) return;
    
    setIsMapping(true);
    
    // Simulate mapping analysis
    setTimeout(() => {
      const resumeSkills = resumeData.skills;
      const requiredSkills = jobData.requiredSkills;
      const preferredSkills = jobData.preferredSkills;
      
      const matchedRequired = resumeSkills.filter(skill => 
        requiredSkills.includes(skill)
      );
      const matchedPreferred = resumeSkills.filter(skill => 
        preferredSkills.includes(skill)
      );
      const missingRequired = requiredSkills.filter(skill => 
        !resumeSkills.includes(skill)
      );
      const missingPreferred = preferredSkills.filter(skill => 
        !resumeSkills.includes(skill)
      );
      
      const matchPercentage = Math.round(
        (matchedRequired.length / requiredSkills.length) * 100
      );
      
      setMappingResult({
        matchPercentage,
        matchedRequired,
        matchedPreferred,
        missingRequired,
        missingPreferred,
        overallScore: calculateOverallScore(matchPercentage, matchedPreferred.length),
        recommendations: generateRecommendations(missingRequired, missingPreferred)
      });
      setIsMapping(false);
    }, 2000);
  };

  const calculateOverallScore = (requiredMatch, preferredMatch) => {
    const requiredWeight = 0.7;
    const preferredWeight = 0.3;
    return Math.round((requiredMatch * requiredWeight) + (preferredMatch * preferredWeight));
  };

  const generateRecommendations = (missingRequired, missingPreferred) => {
    const recommendations = [];
    
    if (missingRequired.length > 0) {
      recommendations.push({
        type: 'critical',
        message: `Focus on acquiring these required skills: ${missingRequired.join(', ')}`
      });
    }
    
    if (missingPreferred.length > 0) {
      recommendations.push({
        type: 'enhancement',
        message: `Consider learning these preferred skills: ${missingPreferred.join(', ')}`
      });
    }
    
    if (missingRequired.length === 0 && missingPreferred.length === 0) {
      recommendations.push({
        type: 'excellent',
        message: 'Excellent match! Your skills align perfectly with the job requirements.'
      });
    }
    
    return recommendations;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
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
            RRF Mapper
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Map resume requirements to job descriptions and get detailed matching analysis 
            with recommendations for improvement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Resume Input
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {resumeData && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Parsed Resume</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {resumeData.name}</p>
                    <p><strong>Skills:</strong> {resumeData.skills.join(', ')}</p>
                    <p><strong>Experience:</strong> {resumeData.experience.length} positions</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Job Description Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-600" />
              Job Description
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Job Description
                </label>
                <textarea
                  onChange={handleJobInput}
                  placeholder="Paste the job description here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
                />
              </div>

              {jobData && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Analyzed Job</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {jobData.title}</p>
                    <p><strong>Company:</strong> {jobData.company}</p>
                    <p><strong>Required Skills:</strong> {jobData.requiredSkills.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mapping Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card flex items-center justify-center"
          >
            <div className="text-center">
              <Map className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <button
                onClick={handleMapping}
                disabled={!resumeData || !jobData || isMapping}
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
              >
                {isMapping ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mapping...</span>
                  </>
                ) : (
                  <>
                    <Map className="w-4 h-4" />
                    <span>Map Requirements</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        {mappingResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                Mapping Results
              </h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Match Score */}
                <div className="text-center">
                  <div className={`w-24 h-24 rounded-full ${getScoreBgColor(mappingResult.matchPercentage)} flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-3xl font-bold ${getScoreColor(mappingResult.matchPercentage)}`}>
                      {mappingResult.matchPercentage}%
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Skills Match</h3>
                  <p className="text-gray-600">Overall Score: {mappingResult.overallScore}%</p>
                </div>

                {/* Matched Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Matched Skills
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mappingResult.matchedRequired.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Preferred Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mappingResult.matchedPreferred.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <XCircle className="w-5 h-5 mr-2 text-red-600" />
                    Missing Skills
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mappingResult.missingRequired.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-700 mb-2">Preferred Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mappingResult.missingPreferred.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  {mappingResult.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        rec.type === 'critical' ? 'bg-red-50 border border-red-200' :
                        rec.type === 'enhancement' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-green-50 border border-green-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {rec.type === 'critical' ? (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        ) : rec.type === 'enhancement' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        )}
                        <p className="text-gray-700">{rec.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="btn-secondary flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RRFMapper; 