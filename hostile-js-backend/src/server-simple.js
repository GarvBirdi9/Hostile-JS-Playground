import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Basic middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Simple analysis endpoint
app.post("/api/analysis/execute", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "Code is required",
        timestamp: new Date().toISOString(),
      });
    }

    // Mock analysis result
    const mockResult = {
      id: Date.now().toString(),
      code,
      timestamp: new Date(),
      behaviors: [
        {
          type: "network_request",
          description: "Attempted to send data to external domain",
          severity: "critical",
          details: {
            url: "https://evil.com/steal",
            method: "POST",
            data: "User localStorage data",
          },
        },
        {
          type: "cookie_access",
          description: "Modified document cookies",
          severity: "high",
          details: {
            action: "set",
            key: "stolen",
            value: "data",
          },
        },
        {
          type: "dynamic_evaluation",
          description: "Used eval() with base64 encoded content",
          severity: "medium",
          details: {
            method: "eval",
            content: 'console.log("Hidden message!")',
          },
        },
      ],
      riskScore: 85,
      executionTime: 1250,
      logs: [
        {
          level: "info",
          message: "Code execution started",
          timestamp: new Date(),
        },
        {
          level: "warning",
          message: "Suspicious network activity detected",
          timestamp: new Date(),
        },
        {
          level: "error",
          message: "Potential data exfiltration attempt",
          timestamp: new Date(),
        },
      ],
    };

    res.json({
      success: true,
      result: mockResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Analysis failed",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hostile JS Playground Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
