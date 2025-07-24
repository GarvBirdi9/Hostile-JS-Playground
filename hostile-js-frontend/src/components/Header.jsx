import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Zap,
  Trophy,
  Settings,
  Palette,
  Info,
  ChevronDown,
} from "lucide-react";

const Header = ({ onThemeChange, onNavigate }) => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-red-500" />
              <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Hostile JS Playground
              </h1>
              <p className="text-sm text-slate-400">
                Analyze & Detect Malicious JavaScript
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#playground"
              className="nav-link text-slate-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/10 hover:backdrop-blur-sm border border-transparent hover:border-blue-500/20"
            >
              Playground
            </a>
            <a
              href="#challenges"
              className="nav-link text-slate-300 hover:text-white transition-all duration-300 flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-purple-500/10 hover:backdrop-blur-sm border border-transparent hover:border-purple-500/20"
            >
              <Trophy className="w-4 h-4 icon-hover" />
              <span>Challenges</span>
            </a>
            <a
              href="#docs"
              className="nav-link text-slate-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-green-500/10 hover:backdrop-blur-sm border border-transparent hover:border-green-500/20"
            >
              Documentation
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={settingsRef}>
              <button
                className="p-3 text-slate-400 hover:text-white transition-all duration-300 flex items-center rounded-lg hover:bg-slate-700/30 hover:scale-105"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-5 h-5 icon-hover" />
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-all duration-300 ${
                    showSettings ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute right-0 mt-2 w-52 settings-dropdown rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="py-2">
                    <button
                      className="settings-dropdown-item w-full px-4 py-3 text-left text-slate-300 hover:text-white flex items-center transition-all duration-300"
                      onClick={() => {
                        onThemeChange && onThemeChange();
                        setShowSettings(false);
                      }}
                    >
                      <Palette className="w-5 h-5 mr-3 icon-hover" />
                      <div>
                        <div className="font-medium">Change Theme</div>
                        <div className="text-xs text-slate-400">
                          Switch between light and dark
                        </div>
                      </div>
                    </button>

                    <a
                      href="#about"
                      className="settings-dropdown-item w-full px-4 py-3 text-left text-slate-300 hover:text-white flex items-center transition-all duration-300"
                      onClick={() => {
                        onNavigate && onNavigate("about");
                        setShowSettings(false);
                      }}
                    >
                      <Info className="w-5 h-5 mr-3 icon-hover" />
                      <div>
                        <div className="font-medium">About Us</div>
                        <div className="text-xs text-slate-400">
                          Learn more about our platform
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  Security Level
                </div>
                <div className="text-xs text-green-400">Safe Mode</div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Sandbox Ready</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Analysis Engine Online</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Secure Environment</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
