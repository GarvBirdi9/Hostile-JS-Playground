const ThreatMeter = ({ score = 0 }) => {
  const getColor = (score) => {
    if (score >= 80) return "text-red-500";
    if (score >= 60) return "text-orange-500";
    if (score >= 40) return "text-yellow-500";
    if (score >= 20) return "text-blue-500";
    return "text-green-500";
  };

  const getGradient = (score) => {
    if (score >= 80) return "from-red-500 to-red-600";
    if (score >= 60) return "from-orange-500 to-orange-600";
    if (score >= 40) return "from-yellow-500 to-yellow-600";
    if (score >= 20) return "from-blue-500 to-blue-600";
    return "from-green-500 to-green-600";
  };

  const radius = 80;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#374151"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                className={`${
                  getGradient(score)
                    ?.split(" ")[0]
                    ?.replace("from-", "stop-") || "stop-green-500"
                }`}
              />
              <stop
                offset="100%"
                className={`${
                  getGradient(score)?.split(" ")[2]?.replace("to-", "stop-") ||
                  "stop-green-600"
                }`}
              />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-slate-400">Risk Score</div>
          </div>
        </div>
      </div>

      {/* Risk level indicator */}
      <div className="mt-4 text-center">
        <div className={`text-lg font-semibold ${getColor(score)}`}>
          {score >= 80
            ? "Critical Risk"
            : score >= 60
            ? "High Risk"
            : score >= 40
            ? "Medium Risk"
            : score >= 20
            ? "Low Risk"
            : "Safe"}
        </div>
        <div className="text-sm text-slate-400 mt-1">
          {score >= 80
            ? "Immediate action required"
            : score >= 60
            ? "Review and mitigate threats"
            : score >= 40
            ? "Monitor for suspicious activity"
            : score >= 20
            ? "Minor concerns detected"
            : "No threats detected"}
        </div>
      </div>
    </div>
  );
};

export default ThreatMeter;
