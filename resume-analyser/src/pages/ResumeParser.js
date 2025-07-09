import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import axios from 'axios';

const ResumeParser = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [activeTab, setActiveTab] = useState('single'); // 'single', 'batch', or 'dashboard'
  const [jdText, setJdText] = useState('');
  const [batchFiles, setBatchFiles] = useState([]);
  const [batchResults, setBatchResults] = useState([]);
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);
  const [batchJdError, setBatchJdError] = useState("");

  // Mock dashboard data
  const [dashboardData] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'React, JavaScript, CSS, HTML',
      resumes: [
        { name: 'Alice Johnson.pdf', matchPercent: 92 },
        { name: 'Bob Smith.docx', matchPercent: 85 },
        { name: 'Charlie Lee.pdf', matchPercent: 78 },
      ],
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Node.js, Express, MongoDB',
      resumes: [
        { name: 'David Kim.doc', matchPercent: 88 },
        { name: 'Eva Brown.pdf', matchPercent: 80 },
      ],
    },
    {
      id: 3,
      title: 'Data Analyst',
      description: 'Python, SQL, Data Visualization',
      resumes: [
        { name: 'Fiona Green.pdf', matchPercent: 95 },
        { name: 'George White.docx', matchPercent: 82 },
      ],
    },
  ]);

  const allowedExtensions = ['.pdf', '.doc', '.docx'];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        setUploadError('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
        setUploadedFile(null);
        setAnalysisResult(null);
        return;
      }
      setUploadedFile(file);
      setAnalysisResult(null);
      setUploadError('');
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await axios.post(
        'https://localhost:58933/api/resumeparser/parse',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      // Transform the response to match what the UI expects
      const data = response.data;
      const transformed = {
        personalInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
        },
        experience: data.workExperience?.$values || [],
        skills: data.skills?.$values || [],
        education: data.education?.$values || [],
      };
      setAnalysisResult(transformed);
    } catch (error) {
      setUploadError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
  };

  // Batch file upload handler
  const handleBatchFolderUpload = (event) => {
    const files = Array.from(event.target.files).filter(file => {
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      return allowedExtensions.includes(ext);
    });
    setBatchFiles(files);
    setBatchResults([]);
  };

  // Batch analyze stub (replace with backend integration)
  const handleBatchAnalyze = async () => {
    if (!batchFiles.length) return;
    if (!jdText.trim()) {
      setBatchJdError("Job Description is required.");
      return;
    }
    setBatchJdError("");
    setIsBatchAnalyzing(true);
    setBatchResults([]);
    // TODO: Replace with backend call for each file
    // Mock: assign random match score
    const results = batchFiles.map(file => ({
      name: file.name,
      size: file.size,
      score: Math.floor(Math.random() * 100),
    }));
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    setBatchResults(results);
    setIsBatchAnalyzing(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none ${activeTab === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('single')}
          >
            Single Resume
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none ${activeTab === 'batch' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('batch')}
          >
            Batch Resume Matching
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </div>

        {/* JD Input */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-900 mb-2">Job Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
            placeholder="Paste the job description here..."
            value={jdText}
            onChange={e => setJdText(e.target.value)}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'single' ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Resume Parser
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your resume and let our AI extract key information including personal details, 
                experience, education, and skills.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Upload Resume
                </h2>

                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your resume here, or click to browse
                    </p>
                    {uploadError && (
                      <div className="text-red-600 font-medium mb-2">{uploadError}</div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-primary cursor-pointer inline-flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Analyze Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Supported Formats</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• PDF files (.pdf)</li>
                    <li>• Microsoft Word (.doc, .docx)</li>
                    <li>• Maximum file size: 10MB</li>
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
                  <User className="w-6 h-6 mr-2 text-green-600" />
                  Analysis Results
                </h2>

                {!analysisResult ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Upload a resume and click analyze to see the results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    {analysisResult.personalInfo && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Personal Information
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{analysisResult.personalInfo.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{analysisResult.personalInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{analysisResult.personalInfo.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{analysisResult.personalInfo.location}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Experience */}
                    {Array.isArray(analysisResult.experience) && analysisResult.experience.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Work Experience
                        </h3>
                        <div className="space-y-3">
                          {analysisResult.experience.map((exp, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                                <span className="text-sm text-gray-500">{exp.duration}</span>
                              </div>
                              <p className="text-gray-600 text-sm">{exp.company}</p>
                              <p className="text-gray-700 mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {Array.isArray(analysisResult.skills) && analysisResult.skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {Array.isArray(analysisResult.education) && analysisResult.education.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Education
                        </h3>
                        <div className="space-y-3">
                          {analysisResult.education.map((edu, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                              <p className="text-gray-600">{edu.school}</p>
                              <p className="text-sm text-gray-500">{edu.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Download Results */}
                    <div className="pt-4 border-t border-gray-200">
                      <button className="btn-secondary flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Analysis</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        ) : (
          activeTab === 'batch' ? (
            // Batch Resume Matching UI
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-green-600" />
                Batch Resume Matching
              </h2>
              <div className="mb-6">
                <input
                  type="file"
                  webkitdirectory="true"
                  directory="true"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleBatchFolderUpload}
                  className="hidden"
                  id="batch-folder-upload"
                />
                <label
                  htmlFor="batch-folder-upload"
                  className="btn-primary cursor-pointer inline-flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Folder
                </label>
                <span className="ml-4 text-gray-600">{batchFiles.length} files selected</span>
              </div>
              {/* Show file names if files are selected */}
              {batchFiles.length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold text-gray-800 mb-1">Selected Files:</div>
                  <ul className="list-disc list-inside text-gray-700 text-sm max-h-40 overflow-y-auto">
                    {batchFiles.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={handleBatchAnalyze}
                disabled={isBatchAnalyzing || !batchFiles.length}
                className="btn-primary mb-6"
              >
                {isBatchAnalyzing ? 'Analyzing...' : 'Analyze All Resumes'}
              </button>
              {batchJdError && (
                <div className="text-red-600 font-medium mb-4">{batchJdError}</div>
              )}
              {batchResults.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Resume Name</th>
                        <th className="px-4 py-2 text-left">Size (MB)</th>
                        <th className="px-4 py-2 text-left">Match Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchResults.map((res, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-2">{res.name}</td>
                          <td className="px-4 py-2">{(res.size / 1024 / 1024).toFixed(2)}</td>
                          <td className="px-4 py-2 font-bold text-blue-700">{res.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ) : (
            // Dashboard UI
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
                Dashboard
              </h2>
              {dashboardData.map(job => (
                <div key={job.id} className="mb-10">
                  <div className="mb-2">
                    <span className="text-xl font-bold text-gray-900">{job.title}</span>
                    <span className="ml-4 text-gray-600 text-sm">{job.description}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Resume Name</th>
                          <th className="px-4 py-2 text-left">Match %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.resumes
                          .slice()
                          .sort((a, b) => b.matchPercent - a.matchPercent)
                          .map((resume, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-4 py-2">{resume.name}</td>
                              <td className="px-4 py-2 font-bold text-green-700">{resume.matchPercent}%</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default ResumeParser; 