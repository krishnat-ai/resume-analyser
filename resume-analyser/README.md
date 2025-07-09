# Resume Analyzer - AI-Powered Analysis Platform

A comprehensive full-stack application for analyzing resumes and job descriptions using AI-powered technology. Built with React.js frontend and .NET 8 Web API backend.

## Features

### 🎯 Core Modules

1. **Resume Parser**
   - Upload and parse resumes (PDF, DOC, DOCX)
   - Extract personal information, experience, education, and skills
   - AI-powered analysis with detailed insights

2. **Job Description Analyzer**
   - Analyze job descriptions for key requirements
   - Identify required vs preferred skills
   - Market demand and competition insights
   - Salary and experience level analysis

3. **RRF Mapper**
   - Map resume requirements to job descriptions
   - Skill matching analysis with percentage scores
   - Personalized recommendations for improvement
   - Comprehensive matching reports

### 🚀 Technology Stack

**Frontend:**
- React 18 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Axios for API calls

**Backend:**
- .NET 8 Web API
- Entity Framework Core
- SQL Server Database
- AutoMapper for object mapping
- Swagger for API documentation

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- .NET 8 SDK
- SQL Server (LocalDB or SQL Server Express)
- Git

### Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The React app will run on `http://localhost:3000`

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd ResumeAnalyzer.API
   ```

2. **Restore NuGet Packages**
   ```bash
   dotnet restore
   ```

3. **Create Database**
   ```bash
   dotnet ef database update
   ```

4. **Run the API**
   ```bash
   dotnet run
   ```
   The API will run on `https://localhost:7001`

### Database Setup

The application uses Entity Framework Core with SQL Server. The connection string is configured in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ResumeAnalyzerDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

## 📁 Project Structure

```
resume-analyser/
├── src/                          # React frontend
│   ├── components/               # Reusable components
│   ├── pages/                   # Page components
│   └── App.js                   # Main app component
├── ResumeAnalyzer.API/          # .NET backend
│   ├── Controllers/             # API controllers
│   ├── Models/                  # Data models
│   ├── Services/                # Business logic
│   └── Data/                    # Database context
├── public/                      # Static assets
└── package.json                 # Frontend dependencies
```

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Interactive Components**: File upload, drag-and-drop, real-time analysis
- **Visual Feedback**: Loading states, progress indicators, and success messages

## 🔧 API Endpoints

### Resume Parser
- `POST /api/resumeparser/parse` - Parse uploaded resume
- `GET /api/resumeparser/{id}` - Get specific resume analysis
- `GET /api/resumeparser` - Get all resume analyses

### Job Analyzer
- `POST /api/jobanalyzer/analyze` - Analyze job description
- `GET /api/jobanalyzer/{id}` - Get specific job analysis
- `GET /api/jobanalyzer` - Get all job analyses

### RRF Mapper
- `POST /api/rrfmapper/map` - Map resume to job requirements
- `GET /api/rrfmapper/{id}` - Get specific mapping result
- `GET /api/rrfmapper` - Get all mapping results

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```
The build artifacts will be in the `build/` folder.

### Backend Deployment
```bash
dotnet publish -c Release
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React.js and .NET 8** 