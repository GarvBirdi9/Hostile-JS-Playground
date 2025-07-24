import {
  Shield,
  Users,
  Target,
  Zap,
  Github,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-red-500 mr-4" />
          <h1 className="text-4xl font-bold text-white">
            About Hostile JS Playground
          </h1>
        </div>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A cutting-edge platform dedicated to JavaScript security research,
          education, and threat detection. We're building the future of web
          security analysis.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Target className="w-6 h-6 text-blue-400 mr-3" />
          Our Mission
        </h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          To democratize JavaScript security analysis by providing researchers,
          developers, and security professionals with powerful tools to
          understand, detect, and defend against malicious JavaScript code.
        </p>
        <p className="text-slate-300 leading-relaxed">
          We believe that by making security analysis accessible and
          educational, we can collectively build a safer web for everyone.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 card-hover risk-card-enhanced hover-bg-warning">
          <div className="flex items-center mb-4">
            <Zap className="w-8 h-8 text-yellow-400 mr-3 icon-hover" />
            <h3 className="text-xl font-semibold text-white">
              Real-time Analysis
            </h3>
          </div>
          <p className="text-slate-400">
            Advanced static and dynamic analysis engines that provide instant
            feedback on JavaScript behavior and potential security threats.
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 card-hover risk-card-enhanced hover-bg-success">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-green-400 mr-3 icon-hover" />
            <h3 className="text-xl font-semibold text-white">Secure Sandbox</h3>
          </div>
          <p className="text-slate-400">
            Isolated execution environment that safely runs potentially
            malicious code while monitoring all system interactions and
            behaviors.
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 card-hover risk-card-enhanced hover-bg-secondary">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-purple-400 mr-3 icon-hover" />
            <h3 className="text-xl font-semibold text-white">
              Educational Platform
            </h3>
          </div>
          <p className="text-slate-400">
            Comprehensive challenges and documentation designed to teach
            security concepts and improve threat detection skills.
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 card-hover risk-card-enhanced hover-bg-danger">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-red-400 mr-3 icon-hover" />
            <h3 className="text-xl font-semibold text-white">Research Tools</h3>
          </div>
          <p className="text-slate-400">
            Professional-grade analysis tools and APIs for security researchers
            and organizations to integrate into their workflows.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Users className="w-6 h-6 text-purple-400 mr-3" />
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">JS</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Security Research Team
            </h3>
            <p className="text-slate-400 text-sm">
              Experts in JavaScript security, malware analysis, and threat
              detection with years of industry experience.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">DE</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Development Team
            </h3>
            <p className="text-slate-400 text-sm">
              Full-stack developers passionate about building secure, scalable
              platforms for the security community.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">ED</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Education Team
            </h3>
            <p className="text-slate-400 text-sm">
              Cybersecurity educators focused on creating engaging learning
              experiences and practical challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React",
            "Node.js",
            "Docker",
            "MongoDB",
            "Express",
            "WebAssembly",
            "Redis",
            "AWS",
          ].map((tech) => (
            <div
              key={tech}
              className="bg-slate-700/50 rounded-lg p-3 text-center"
            >
              <span className="text-slate-300 font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Social */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Get In Touch
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/hostile-js-playground"
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://twitter.com/hostilejs"
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>
          <a
            href="mailto:contact@hostilejs.com"
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-slate-400">
            Made with passion for web security
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2024 Hostile JS Playground. Open source and community-driven.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
