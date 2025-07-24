import { Info, AlertTriangle, XCircle, Bug, Clock } from "lucide-react";

const ExecutionLogs = ({ logs = [] }) => {
  const getIcon = (level) => {
    switch (level) {
      case "info":
        return Info;
      case "warning":
        return AlertTriangle;
      case "error":
        return XCircle;
      case "debug":
        return Bug;
    }
  };

  const getColor = (level) => {
    switch (level) {
      case "info":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      case "debug":
        return "text-purple-400";
    }
  };

  const getBgColor = (level) => {
    switch (level) {
      case "info":
        return "bg-blue-500/10";
      case "warning":
        return "bg-yellow-500/10";
      case "error":
        return "bg-red-500/10";
      case "debug":
        return "bg-purple-500/10";
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });
    } catch (error) {
      return "Invalid time";
    }
  };

  if (logs.length === 0) {
    return (
      <div className="p-6 text-center">
        <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">No execution logs available</p>
        <p className="text-sm text-slate-500 mt-1">
          Logs will appear here during code execution
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Execution Logs ({logs.length})
      </h3>

      <div className="space-y-2">
        {logs.map((log, index) => {
          const Icon = getIcon(log.level);

          return (
            <div
              key={index}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border border-slate-700
                ${getBgColor(log.level)} hover:bg-slate-700/30 transition-colors
              `}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`w-4 h-4 ${getColor(log.level)}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`text-xs font-medium uppercase ${getColor(
                      log.level
                    )}`}
                  >
                    {log.level}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatTime(log.timestamp)}
                  </span>
                  {log.source && (
                    <span className="text-xs text-slate-500">
                      [{log.source}]
                    </span>
                  )}
                </div>

                <div className="text-sm text-slate-300 break-words">
                  {log.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Statistics */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-4 gap-4 text-center">
          {["info", "warning", "error", "debug"].map((level) => {
            const count = logs.filter((log) => log.level === level).length;
            const Icon = getIcon(level);

            return (
              <div key={level} className="flex flex-col items-center space-y-1">
                <Icon className={`w-4 h-4 ${getColor(level)}`} />
                <span className="text-lg font-bold text-white">{count}</span>
                <span className="text-xs text-slate-400 capitalize">
                  {level}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExecutionLogs;
