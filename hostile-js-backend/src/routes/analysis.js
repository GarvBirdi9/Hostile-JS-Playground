import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { analyzeCode } from '../services/codeAnalyzer.js'
import { executeSandbox } from '../services/sandboxExecutor.js'
import { validateCodeInput } from '../validators/codeValidator.js'

const router = express.Router()

// Analyze JavaScript code for malicious behavior
router.post('/execute', async (req, res, next) => {
  try {
    const { code, options = {} } = req.body

    // Validate input
    const validation = validateCodeInput(code)
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid input',
        details: validation.errors,
        timestamp: new Date().toISOString()
      })
    }

    const executionId = uuidv4()
    const startTime = Date.now()

    console.log(`🔍 Starting analysis for execution ${executionId}`)

    // Step 1: Static analysis
    const staticAnalysis = await analyzeCode(code)
    
    // Step 2: Dynamic analysis in sandbox
    const sandboxResult = await executeSandbox(code, {
      timeout: options.timeout || 5000,
      memoryLimit: options.memoryLimit || 50, // MB
      networkAccess: options.networkAccess || false,
      ...options
    })

    // Step 3: Combine results and calculate risk score
    const behaviors = [
      ...staticAnalysis.behaviors,
      ...sandboxResult.behaviors
    ]

    const riskScore = calculateRiskScore(behaviors)
    const executionTime = Date.now() - startTime

    const result = {
      id: executionId,
      code,
      timestamp: new Date(),
      behaviors,
      riskScore,
      executionTime,
      logs: [
        ...staticAnalysis.logs,
        ...sandboxResult.logs
      ],
      sandboxId: sandboxResult.sandboxId,
      staticAnalysis: {
        patterns: staticAnalysis.patterns,
        complexity: staticAnalysis.complexity,
        obfuscation: staticAnalysis.obfuscation
      },
      dynamicAnalysis: {
        networkCalls: sandboxResult.networkCalls,
        domModifications: sandboxResult.domModifications,
        storageAccess: sandboxResult.storageAccess,
        consoleOutput: sandboxResult.consoleOutput
      }
    }

    console.log(`✅ Analysis completed for ${executionId} - Risk Score: ${riskScore}`)

    res.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analysis error:', error)
    next(error)
  }
})

// Get analysis history
router.get('/history', async (req, res, next) => {
  try {
    // TODO: Implement database storage and retrieval
    res.json({
      success: true,
      history: [],
      message: 'History feature coming soon',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    next(error)
  }
})

// Get analysis by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    
    // TODO: Implement database retrieval
    res.json({
      success: true,
      result: null,
      message: 'Analysis retrieval feature coming soon',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    next(error)
  }
})

// Calculate risk score based on detected behaviors
function calculateRiskScore(behaviors) {
  if (!behaviors || behaviors.length === 0) return 0

  const severityWeights = {
    critical: 25,
    high: 15,
    medium: 8,
    low: 3,
    info: 1
  }

  const typeWeights = {
    network_request: 1.5,
    data_exfiltration: 2.0,
    dynamic_evaluation: 1.3,
    obfuscation: 1.2,
    crypto_mining: 1.8,
    dom_manipulation: 1.1,
    cookie_access: 1.2,
    local_storage: 1.1,
    timing_attack: 1.4,
    fingerprinting: 1.0
  }

  let totalScore = 0
  let maxPossibleScore = 0

  behaviors.forEach(behavior => {
    const severityScore = severityWeights[behavior.severity] || 1
    const typeMultiplier = typeWeights[behavior.type] || 1
    const behaviorScore = severityScore * typeMultiplier

    totalScore += behaviorScore
    maxPossibleScore += severityWeights.critical * 2.0 // Max possible per behavior
  })

  // Normalize to 0-100 scale
  const normalizedScore = Math.min(100, (totalScore / Math.max(maxPossibleScore, 1)) * 100)
  
  // Apply diminishing returns for many low-severity behaviors
  const behaviorCount = behaviors.length
  const diminishingFactor = Math.min(1, 1 / Math.sqrt(behaviorCount / 5))
  
  return Math.round(normalizedScore * diminishingFactor)
}

export default router
