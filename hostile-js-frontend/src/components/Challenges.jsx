import { useState, useEffect } from "react";
import { Trophy, Target, Clock, Users, Star, ChevronRight } from "lucide-react";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/challenges");
      const data = await response.json();
      if (data.success) {
        setChallenges(data.challenges);
      }
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "advanced":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "expert":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "data_exfiltration":
        return "🔓";
      case "dynamic_evaluation":
        return "⚡";
      case "network_request":
        return "🌐";
      case "obfuscation":
        return "🎭";
      default:
        return "🎯";
    }
  };

  const filteredChallenges = challenges.filter(
    (challenge) =>
      selectedDifficulty === "all" ||
      challenge.difficulty === selectedDifficulty
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Security Challenges</h1>
        </div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Test your skills with hands-on JavaScript security challenges. Learn
          to write and detect malicious code in a safe environment.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 card-hover risk-card-enhanced">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-400 icon-hover" />
            <div>
              <div className="text-2xl font-bold text-white">
                {challenges.length}
              </div>
              <div className="text-sm text-slate-400">Total Challenges</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 card-hover risk-card-enhanced">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-green-400 icon-hover" />
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-slate-400">Available</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 card-hover risk-card-enhanced">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-400 icon-hover" />
            <div>
              <div className="text-2xl font-bold text-white">1,337</div>
              <div className="text-sm text-slate-400">Participants</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 card-hover risk-card-enhanced">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-yellow-400 icon-hover" />
            <div>
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-sm text-slate-400">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {["all", "beginner", "intermediate", "advanced", "expert"].map(
            (difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`filter-button px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedDifficulty === difficulty
                    ? "active bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : "bg-slate-800/50 text-slate-400 border-slate-700 hover-bg-primary"
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 card-hover risk-card-enhanced transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getCategoryIcon(challenge.category)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {challenge.title}
                  </h3>
                  <div
                    className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
                      challenge.difficulty
                    )}`}
                  >
                    {challenge.difficulty.toUpperCase()}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>

            <p className="text-slate-300 mb-4">{challenge.description}</p>

            <div className="mb-4">
              <div className="text-sm font-medium text-slate-400 mb-2">
                Objective:
              </div>
              <div className="text-sm text-slate-300">
                {challenge.objective}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-400">
                  Max Score:{" "}
                  <span className="text-yellow-400 font-medium">
                    {challenge.maxScore}
                  </span>
                </div>
              </div>
              <button className="btn-primary hover:scale-105 active:scale-95 text-sm">
                Start Challenge
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            No challenges found
          </h3>
          <p className="text-slate-500">
            Try adjusting your filters or check back later for new challenges.
          </p>
        </div>
      )}

      {/* Coming Soon */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 p-8">
          <h3 className="text-xl font-semibold text-white mb-2">
            More Challenges Coming Soon!
          </h3>
          <p className="text-slate-400">
            We're constantly adding new challenges. Follow us for updates on
            advanced scenarios, CTF-style challenges, and collaborative
            competitions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
