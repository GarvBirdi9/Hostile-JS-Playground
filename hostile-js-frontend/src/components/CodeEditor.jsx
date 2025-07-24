import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Save,
  Upload,
  Download,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

const CodeEditor = ({ code, onChange, onExecute, isExecuting }) => {
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  const handleEditorChange = (value) => {
    onChange(value || "");
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hostile-code.js";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".js,.txt";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          onChange(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClear = () => {
    onChange("");
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: "on",
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    glyphMargin: false,
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-slate-800 rounded-lg border-2 border-slate-600 shadow-2xl shadow-slate-900/50">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-600 bg-slate-800/30 shadow-inner">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-slate-300 ml-3">
            hostile-code.js
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleLoad}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Load file"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Save file"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Clear editor"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 p-4 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme={editorTheme}
          value={code}
          onChange={handleEditorChange}
          options={{
            ...editorOptions,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Execute Panel */}
      <div className="p-4 border-t-2 border-slate-600 bg-slate-800/30 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onExecute}
              disabled={isExecuting || !code.trim()}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${
                  isExecuting || !code.trim()
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "btn-danger hover:scale-105 active:scale-95"
                }
              `}
            >
              {isExecuting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute & Analyze</span>
                </>
              )}
            </button>

            {code.trim() && (
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>Code will run in secure sandbox</span>
              </div>
            )}
          </div>

          <div className="text-sm text-slate-400">
            Lines: {code.split("\n").length} | Chars: {code.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
