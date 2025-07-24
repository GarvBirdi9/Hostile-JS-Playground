import {
  Globe,
  Code,
  Cookie,
  Database,
  Zap,
  Cpu,
  Eye,
  Clock,
  Fingerprint,
  Download,
  AlertTriangle,
  Info,
  Shield,
} from "lucide-react";

const BehaviorList = ({ behaviors = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case "network_request":
        return Globe;
      case "dom_manipulation":
        return Code;
      case "cookie_access":
        return Cookie;
      case "local_storage":
        return Database;
      case "dynamic_evaluation":
        return Zap;
      case "crypto_mining":
        return Cpu;
      case "obfuscation":
        return Eye;
      case "timing_attack":
        return Clock;
      case "fingerprinting":
        return Fingerprint;
      case "data_exfiltration":
        return Download;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "low":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "info":
        return "text-green-500 bg-green-500/10 border-green-500/20";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
      case "high":
        return AlertTriangle;
      case "medium":
        return Shield;
      case "low":
      case "info":
        return Info;
    }
  };

  if (behaviors.length === 0) {
    return (
      <div className="p-6 text-center">
        <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">No suspicious behaviors detected</p>
        <p className="text-sm text-slate-500 mt-1">
          The code appears to be safe
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Detected Behaviors ({behaviors.length})
      </h3>

      <div className="space-y-3">
        {behaviors.map((behavior, index) => {
          const Icon = getIcon(behavior.type);
          const SeverityIcon = getSeverityIcon(behavior.severity);

          return (
            <div
              key={index}
              className={`
                border rounded-lg p-4 transition-all duration-300 hover:shadow-lg card-hover
                ${getSeverityColor(behavior.severity)}
                ${`severity-${behavior.severity}`}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5 mt-0.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-white">
                      {behavior.description}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <SeverityIcon className="w-3 h-3" />
                      <span className="text-xs font-medium uppercase">
                        {behavior.severity}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 mb-3">
                    Type: {behavior.type.replace("_", " ").toUpperCase()}
                  </div>

                  {/* Behavior Details */}
                  <div
                    className={`rounded p-3 text-xs ${
                      behavior.severity === "critical"
                        ? "bg-red-500/5"
                        : behavior.severity === "high"
                        ? "bg-orange-500/5"
                        : behavior.severity === "medium"
                        ? "bg-yellow-500/5"
                        : behavior.severity === "low"
                        ? "bg-blue-500/5"
                        : "bg-green-500/5"
                    }`}
                  >
                    <div className="font-medium text-slate-300 mb-2">
                      Details:
                    </div>
                    <div className="space-y-1">
                      {Object.entries(behavior.details).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="text-slate-400 w-20 flex-shrink-0">
                            {key}:
                          </span>
                          <span className="text-slate-300 break-all">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BehaviorList;
