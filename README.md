# 🛡️ Hostile JS Playground

A cloud-based platform for analyzing and detecting malicious JavaScript behavior in a secure, sandboxed environment.

## 🎯 Overview

Hostile JS Playground is an educational and research platform that allows users to:

- **Write & Execute** JavaScript code in a secure sandbox
- **Analyze Behavior** with real-time threat detection
- **Learn Security** through hands-on experimentation
- **Challenge Skills** with gamified security challenges

## ⚡ Features

### 🔍 **Advanced Analysis Engine**
- **Static Code Analysis**: Pattern-based threat detection
- **Dynamic Execution**: Instrumented sandbox environment
- **Behavior Tracking**: Network, DOM, storage, and timing analysis
- **Risk Scoring**: Intelligent threat level calculation

### 🎮 **Challenge Mode**
- Gamified security challenges
- Skill-based difficulty levels
- Leaderboards and scoring
- Educational feedback system

### 🛡️ **Security Features**
- Isolated execution environment
- Network request blocking
- Memory and time limits
- Comprehensive logging

## 🏗️ Architecture

```
Frontend (React + Vite)     Backend (Node.js + Express)     Sandbox Environment
┌─────────────────────┐    ┌──────────────────────────┐    ┌─────────────────┐
│ • Code Editor       │    │ • Analysis API           │    │ • VM Isolation  │
│ • Dashboard         │    │ • Static Analyzer        │    │ • Instrumentation│
│ • Visualization     │◄──►│ • Sandbox Orchestrator   │◄──►│ • Behavior Logs │
│ • Challenge System  │    │ • Threat Detection       │    │ • Safety Limits │
└─────────────────────┘    └──────────────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hostile-js-playground
```

2. **Install Frontend Dependencies**
```bash
cd hostile-js-frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../hostile-js-backend
npm install
```

4. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

1. **Start the Backend**
```bash
cd hostile-js-backend
npm run dev
# Server runs on http://localhost:3002
```

2. **Start the Frontend**
```bash
cd hostile-js-frontend
npm run dev
# App runs on http://localhost:5173
```

3. **Open your browser** and navigate to `http://localhost:5173`

## 📊 API Endpoints

### Analysis
- `POST /api/analysis/execute` - Execute and analyze JavaScript code
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/:id` - Get specific analysis result

### Sandbox
- `GET /api/sandbox/status` - Get sandbox status
- `GET /api/sandbox/config` - Get sandbox configuration

### Challenges
- `GET /api/challenges` - List all challenges
- `GET /api/challenges/:id` - Get specific challenge
- `POST /api/challenges/:id/submit` - Submit challenge solution

## 🔬 Detection Capabilities

### Static Analysis
- **Dynamic Evaluation**: `eval()`, `Function()`, string-based timers
- **Network Requests**: `fetch()`, `XMLHttpRequest`
- **Data Access**: Cookies, localStorage, sessionStorage
- **DOM Manipulation**: `document.write()`, innerHTML modification
- **Obfuscation**: Base64 encoding, string manipulation, hex escapes

### Dynamic Analysis
- **Runtime Behavior**: Function calls, object access
- **Network Monitoring**: Request interception and logging
- **Storage Tracking**: Data read/write operations
- **Timing Analysis**: Performance measurements, delays
- **Error Detection**: Runtime exceptions and failures

## 🎯 Challenge Categories

1. **Data Exfiltration** - Cookie stealing, data transmission
2. **Dynamic Evaluation** - Code injection, eval usage
3. **Network Requests** - Stealth communication
4. **Obfuscation** - Code hiding techniques

## 🛡️ Security Measures

- **Sandboxed Execution**: Isolated VM environment
- **Network Isolation**: Blocked external requests
- **Resource Limits**: Memory and execution time constraints
- **Input Validation**: Code size and complexity limits
- **Rate Limiting**: API request throttling

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=3002
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# Security
JWT_SECRET=your-secret-key
BCRYPT_ROUNDS=12

# Sandbox
SANDBOX_TIMEOUT=5000
SANDBOX_MEMORY_LIMIT=50
MAX_CODE_SIZE=100000
```

## 📈 Risk Scoring

The platform calculates risk scores (0-100) based on:

- **Severity Weights**: Critical (25), High (15), Medium (8), Low (3), Info (1)
- **Behavior Types**: Network requests, data access, code evaluation
- **Pattern Complexity**: Obfuscation level, code structure
- **Execution Context**: Runtime errors, timing patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This platform is designed for educational and research purposes only. Users are responsible for ensuring their code analysis activities comply with applicable laws and regulations.

## 🙏 Acknowledgments

- Built with React, Node.js, and Express
- Powered by Monaco Editor for code editing
- Styled with Tailwind CSS
- Icons by Lucide React

---

**Happy Hacking! 🚀**
