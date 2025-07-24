import { v4 as uuidv4 } from "uuid";
import vm from "vm";

// Execute JavaScript code in a secure sandbox
export async function executeSandbox(code, options = {}) {
  const sandboxId = uuidv4();
  const startTime = Date.now();
  const behaviors = [];
  const logs = [];
  const networkCalls = [];
  const domModifications = [];
  const storageAccess = [];
  const consoleOutput = [];

  try {
    logs.push({
      level: "info",
      message: `Starting sandbox execution ${sandboxId}`,
      timestamp: new Date(),
    });

    // Create instrumented sandbox environment
    const sandbox = createInstrumentedSandbox({
      behaviors,
      logs,
      networkCalls,
      domModifications,
      storageAccess,
      consoleOutput,
    });

    // Execute the code in Node.js VM context with timeout
    let result;
    try {
      const context = vm.createContext(sandbox);

      // Set up timeout
      const timeoutMs = options.timeout || 5000;
      result = vm.runInContext(code, context, {
        timeout: timeoutMs,
        displayErrors: true,
      });
    } catch (executionError) {
      logs.push({
        level: "error",
        message: `Code execution error: ${executionError.message}`,
        timestamp: new Date(),
      });

      // Execution errors can still provide valuable analysis data
      behaviors.push({
        type: "dynamic_evaluation",
        severity: "medium",
        description: "Code execution resulted in runtime error",
        details: {
          error: executionError.message,
          type: executionError.name,
        },
        timestamp: new Date(),
      });
    }

    const executionTime = Date.now() - startTime;

    logs.push({
      level: "info",
      message: `Sandbox execution completed in ${executionTime}ms`,
      timestamp: new Date(),
    });

    return {
      sandboxId,
      behaviors,
      logs,
      networkCalls,
      domModifications,
      storageAccess,
      consoleOutput,
      result,
      executionTime,
    };
  } catch (error) {
    logs.push({
      level: "error",
      message: `Sandbox execution failed: ${error.message}`,
      timestamp: new Date(),
    });

    throw {
      type: "SANDBOX_ERROR",
      message: "Sandbox execution failed",
      details: error.message,
    };
  }
}

function createInstrumentedSandbox({
  behaviors,
  logs,
  networkCalls,
  domModifications,
  storageAccess,
  consoleOutput,
}) {
  return {
    // Console instrumentation
    console: {
      log: (...args) => {
        consoleOutput.push({
          type: "log",
          args: args.map((arg) => String(arg)),
          timestamp: new Date(),
        });
      },
      warn: (...args) => {
        consoleOutput.push({
          type: "warn",
          args: args.map((arg) => String(arg)),
          timestamp: new Date(),
        });
      },
      error: (...args) => {
        consoleOutput.push({
          type: "error",
          args: args.map((arg) => String(arg)),
          timestamp: new Date(),
        });
        behaviors.push({
          type: "dynamic_evaluation",
          severity: "low",
          description: "Code logged error to console",
          details: { message: args.join(" ") },
          timestamp: new Date(),
        });
      },
    },

    // Network request instrumentation
    fetch: function (url, options = {}) {
      networkCalls.push({
        type: "fetch",
        url: String(url),
        method: options.method || "GET",
        timestamp: new Date(),
      });

      behaviors.push({
        type: "network_request",
        severity: "high",
        description: "Attempted network request using fetch()",
        details: {
          url: String(url),
          method: options.method || "GET",
          headers: options.headers || {},
        },
        timestamp: new Date(),
      });

      // Return a mock response to prevent actual network calls
      return Promise.resolve({
        ok: false,
        status: 403,
        statusText: "Forbidden - Network access blocked in sandbox",
        json: () => Promise.resolve({ error: "Network access blocked" }),
        text: () => Promise.resolve("Network access blocked"),
      });
    },

    XMLHttpRequest: function () {
      behaviors.push({
        type: "network_request",
        severity: "high",
        description: "Created XMLHttpRequest object",
        details: { type: "XMLHttpRequest" },
        timestamp: new Date(),
      });

      // Return a mock XMLHttpRequest
      return {
        open: function (method, url) {
          networkCalls.push({
            type: "XMLHttpRequest",
            method,
            url,
            timestamp: new Date(),
          });
        },
        send: function () {
          logs.push({
            level: "warning",
            message: "XMLHttpRequest send blocked in sandbox",
            timestamp: new Date(),
          });
        },
        readyState: 4,
        status: 403,
        responseText: "Network access blocked",
      };
    },

    // Document and DOM instrumentation
    document: {
      cookie: "",
      get cookie() {
        behaviors.push({
          type: "cookie_access",
          severity: "medium",
          description: "Accessed document.cookie",
          details: { action: "read" },
          timestamp: new Date(),
        });
        return this._cookie || "";
      },
      set cookie(value) {
        this._cookie = value;
        behaviors.push({
          type: "cookie_access",
          severity: "high",
          description: "Modified document.cookie",
          details: { action: "write", value: String(value) },
          timestamp: new Date(),
        });
        storageAccess.push({
          type: "cookie",
          action: "set",
          value: String(value),
          timestamp: new Date(),
        });
      },

      write: function (content) {
        domModifications.push({
          type: "document.write",
          content: String(content),
          timestamp: new Date(),
        });
        behaviors.push({
          type: "dom_manipulation",
          severity: "medium",
          description: "Used document.write()",
          details: { content: String(content) },
          timestamp: new Date(),
        });
      },

      createElement: function (tagName) {
        domModifications.push({
          type: "createElement",
          tagName: String(tagName),
          timestamp: new Date(),
        });
        return {
          tagName: String(tagName).toUpperCase(),
          innerHTML: "",
          setAttribute: function () {},
          appendChild: function () {},
        };
      },
    },

    // Storage instrumentation
    localStorage: {
      getItem: function (key) {
        storageAccess.push({
          type: "localStorage",
          action: "get",
          key: String(key),
          timestamp: new Date(),
        });
        behaviors.push({
          type: "local_storage",
          severity: "low",
          description: "Accessed localStorage",
          details: { action: "read", key: String(key) },
          timestamp: new Date(),
        });
        return null;
      },
      setItem: function (key, value) {
        storageAccess.push({
          type: "localStorage",
          action: "set",
          key: String(key),
          value: String(value),
          timestamp: new Date(),
        });
        behaviors.push({
          type: "local_storage",
          severity: "medium",
          description: "Modified localStorage",
          details: { action: "write", key: String(key), value: String(value) },
          timestamp: new Date(),
        });
      },
      removeItem: function (key) {
        storageAccess.push({
          type: "localStorage",
          action: "remove",
          key: String(key),
          timestamp: new Date(),
        });
      },
    },

    sessionStorage: {
      getItem: function (key) {
        storageAccess.push({
          type: "sessionStorage",
          action: "get",
          key: String(key),
          timestamp: new Date(),
        });
        return null;
      },
      setItem: function (key, value) {
        storageAccess.push({
          type: "sessionStorage",
          action: "set",
          key: String(key),
          value: String(value),
          timestamp: new Date(),
        });
      },
    },

    // Timing functions with enhanced detection
    setTimeout: function (callback, delay) {
      if (typeof callback === "string") {
        behaviors.push({
          type: "dynamic_evaluation",
          severity: "high",
          description: "Used setTimeout with string code",
          details: { code: callback, delay },
          timestamp: new Date(),
        });
      }

      // Detect potential timing attacks
      if (delay === 0 || delay < 10) {
        behaviors.push({
          type: "timing_attack",
          severity: "medium",
          description:
            "Used setTimeout with very short delay (potential timing attack)",
          details: { delay },
          timestamp: new Date(),
        });
      }

      return 1; // Mock timer ID
    },

    setInterval: function (callback, delay) {
      if (typeof callback === "string") {
        behaviors.push({
          type: "dynamic_evaluation",
          severity: "high",
          description: "Used setInterval with string code",
          details: { code: callback, delay },
          timestamp: new Date(),
        });
      }

      // Detect potential crypto mining
      if (delay < 100) {
        behaviors.push({
          type: "crypto_mining",
          severity: "medium",
          description:
            "Used setInterval with short delay (potential crypto mining)",
          details: { delay },
          timestamp: new Date(),
        });
      }

      return 1; // Mock timer ID
    },

    // Performance timing (potential fingerprinting)
    performance: {
      now: function () {
        behaviors.push({
          type: "timing_attack",
          severity: "low",
          description: "Used performance.now() for high-resolution timing",
          details: { method: "performance.now" },
          timestamp: new Date(),
        });
        return Date.now();
      },
    },

    // Crypto and encoding functions
    atob: function (data) {
      behaviors.push({
        type: "obfuscation",
        severity: "medium",
        description: "Used atob() for base64 decoding",
        details: { data: String(data).substring(0, 100) },
        timestamp: new Date(),
      });
      try {
        return Buffer.from(data, "base64").toString("ascii");
      } catch {
        return "";
      }
    },

    btoa: function (data) {
      behaviors.push({
        type: "obfuscation",
        severity: "low",
        description: "Used btoa() for base64 encoding",
        details: { data: String(data).substring(0, 100) },
        timestamp: new Date(),
      });
      return Buffer.from(data).toString("base64");
    },

    // Global objects
    window: {},
    global: {},

    // Utility functions
    Date: Date,
    Math: Math,
    JSON: JSON,
    String: String,
    Number: Number,
    Boolean: Boolean,
    Array: Array,
    Object: Object,
    RegExp: RegExp,
    Error: Error,

    // Prevent access to dangerous functions
    eval: function () {
      behaviors.push({
        type: "dynamic_evaluation",
        severity: "critical",
        description: "Attempted to use eval()",
        details: { blocked: true },
        timestamp: new Date(),
      });
      throw new Error("eval() is not allowed in sandbox");
    },

    Function: function () {
      behaviors.push({
        type: "dynamic_evaluation",
        severity: "critical",
        description: "Attempted to use Function constructor",
        details: { blocked: true },
        timestamp: new Date(),
      });
      throw new Error("Function constructor is not allowed in sandbox");
    },
  };
}
