import { useState } from "react";
import ThreatMeter from "./ThreatMeter";
import BehaviorList from "./BehaviorList";
import ExecutionLogs from "./ExecutionLogs";
import ThreatTimeline from "./ThreatTimeline";
import {
  Activity,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Dashboard = ({ result, isLoading }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-2">
            Analysis Dashboard
          </h2>
          <p className="text-slate-400">Running security analysis...</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg font-medium">Analyzing Code</p>
            <p className="text-slate-500 text-sm mt-2">
              Detecting malicious patterns...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col h-full bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-2">
            Analysis Dashboard
          </h2>
          <p className="text-slate-400">
            Execute code to see security analysis
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Ready for Analysis</p>
            <p className="text-slate-500 text-sm mt-2">
              Write JavaScript code and click "Execute & Analyze" to begin
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getThreatLevel = (score) => {
    if (score >= 80)
      return { level: "Critical", color: "text-red-500", bg: "bg-red-500/10" };
    if (score >= 60)
      return {
        level: "High",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
      };
    if (score >= 40)
      return {
        level: "Medium",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
      };
    if (score >= 20)
      return { level: "Low", color: "text-blue-500", bg: "bg-blue-500/10" };
    return { level: "Safe", color: "text-green-500", bg: "bg-green-500/10" };
  };

  const threat = getThreatLevel(result?.riskScore || 0);

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "behaviors", label: "Behaviors", icon: AlertTriangle },
    { id: "logs", label: "Logs", icon: Clock },
    { id: "timeline", label: "Timeline", icon: Shield },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-slate-800 rounded-lg border-2 border-slate-600 shadow-2xl shadow-slate-900/50">
      {/* Dashboard Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${threat.bg} ${threat.color}`}
          >
            {threat.level} Risk
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 risk-card risk-card-enhanced card-hover">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-400 icon-hover" />
              <span className="text-sm text-slate-400 font-medium">
                Risk Score
              </span>
            </div>
            <div className="text-3xl font-bold text-white">
              {result?.riskScore || 0}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 risk-card risk-card-enhanced card-hover">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400 icon-hover" />
              <span className="text-sm text-slate-400 font-medium">
                Behaviors
              </span>
            </div>
            <div className="text-3xl font-bold text-white">
              {result?.behaviors?.length || 0}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 risk-card risk-card-enhanced card-hover">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-green-400 icon-hover" />
              <span className="text-sm text-slate-400 font-medium">
                Exec Time
              </span>
            </div>
            <div className="text-3xl font-bold text-white">
              {result?.executionTime || 0}ms
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b-2 border-slate-600 bg-slate-800/30 shadow-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                tab-button flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "text-blue-400 border-b-2 border-blue-400 bg-slate-700/30 tab-active active"
                    : "text-slate-400 hover:text-slate-300"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "overview" && (
          <div className="p-6 space-y-6 overflow-y-auto h-full custom-scrollbar">
            <ThreatMeter score={result?.riskScore || 0} />
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 dashboard-summary-card">
                <h3 className="text-lg font-medium text-white mb-3">Summary</h3>
                <div className="space-y-2">
                  {(result?.behaviors || [])
                    .slice(0, 3)
                    .map((behavior, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            behavior.severity === "critical"
                              ? "bg-red-500"
                              : behavior.severity === "high"
                              ? "bg-orange-500"
                              : behavior.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <span className="text-sm text-slate-300">
                          {behavior.description}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "behaviors" && (
          <div className="overflow-y-auto h-full custom-scrollbar">
            <BehaviorList behaviors={result?.behaviors || []} />
          </div>
        )}

        {activeTab === "logs" && (
          <div className="overflow-y-auto h-full custom-scrollbar">
            <ExecutionLogs logs={result?.logs || []} />
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="overflow-y-auto h-full custom-scrollbar">
            <ThreatTimeline behaviors={result?.behaviors || []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
