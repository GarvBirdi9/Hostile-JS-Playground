import { Clock, AlertTriangle, Shield, Info } from "lucide-react";

const ThreatTimeline = ({ behaviors = [] }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      case "info":
        return "bg-green-500";
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

  // Sort behaviors by timestamp if available, otherwise by severity
  const sortedBehaviors = [...behaviors].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      const dateA =
        a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
      const dateB =
        b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
      return dateA.getTime() - dateB.getTime();
    }

    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  if (behaviors.length === 0) {
    return (
      <div className="p-6 text-center">
        <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">No timeline data available</p>
        <p className="text-sm text-slate-500 mt-1">
          Behavior timeline will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Threat Timeline</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-600"></div>

        <div className="space-y-6">
          {sortedBehaviors.map((behavior, index) => {
            const Icon = getSeverityIcon(behavior.severity);

            return (
              <div key={index} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${getSeverityColor(behavior.severity)}
                  `}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div
                    className={`rounded-lg p-4 border transition-all duration-300 card-hover ${
                      behavior.severity === "critical"
                        ? "bg-red-500/10 border-red-500/30 severity-critical"
                        : behavior.severity === "high"
                        ? "bg-orange-500/10 border-orange-500/30 severity-high"
                        : behavior.severity === "medium"
                        ? "bg-yellow-500/10 border-yellow-500/30 severity-medium"
                        : behavior.severity === "low"
                        ? "bg-blue-500/10 border-blue-500/30 severity-low"
                        : "bg-green-500/10 border-green-500/30 severity-info"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">
                        {behavior.description}
                      </h4>
                      <span
                        className={`
                        px-2 py-1 rounded text-xs font-medium uppercase
                        ${
                          behavior.severity === "critical"
                            ? "bg-red-500/20 text-red-400"
                            : behavior.severity === "high"
                            ? "bg-orange-500/20 text-orange-400"
                            : behavior.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : behavior.severity === "low"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }
                      `}
                      >
                        {behavior.severity}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mb-3">
                      {behavior.type.replace("_", " ").toUpperCase()}
                      {behavior.timestamp && (
                        <span className="ml-2">
                          •{" "}
                          {(() => {
                            try {
                              const date =
                                behavior.timestamp instanceof Date
                                  ? behavior.timestamp
                                  : new Date(behavior.timestamp);
                              return date.toLocaleTimeString();
                            } catch (error) {
                              return "Invalid time";
                            }
                          })()}
                        </span>
                      )}
                    </div>

                    {/* Behavior details */}
                    <div className="bg-slate-800/50 rounded p-3 text-xs">
                      <div className="space-y-1">
                        {Object.entries(behavior.details)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key} className="flex">
                              <span className="text-slate-400 w-16 flex-shrink-0">
                                {key}:
                              </span>
                              <span className="text-slate-300 break-all">
                                {typeof value === "object"
                                  ? JSON.stringify(value).slice(0, 50) + "..."
                                  : String(value).slice(0, 50) +
                                    (String(value).length > 50 ? "..." : "")}
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

      {/* Timeline summary */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              {behaviors.length}
            </div>
            <div className="text-sm text-slate-400">Total Events</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {
                behaviors.filter(
                  (b) => b.severity === "critical" || b.severity === "high"
                ).length
              }
            </div>
            <div className="text-sm text-slate-400">High Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatTimeline;
