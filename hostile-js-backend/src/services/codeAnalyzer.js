// Static code analysis for detecting malicious patterns
export async function analyzeCode(code) {
  const startTime = Date.now()
  const behaviors = []
  const logs = []
  const patterns = []

  try {
    logs.push({
      level: 'info',
      message: 'Starting static code analysis',
      timestamp: new Date()
    })

    // Analyze for various threat patterns
    const threatPatterns = [
      // Network requests
      {
        pattern: /fetch\s*\(/gi,
        type: 'network_request',
        severity: 'medium',
        description: 'Uses fetch() for network requests'
      },
      {
        pattern: /XMLHttpRequest/gi,
        type: 'network_request',
        severity: 'medium',
        description: 'Uses XMLHttpRequest for network requests'
      },
      {
        pattern: /\.send\s*\(/gi,
        type: 'network_request',
        severity: 'low',
        description: 'Sends network requests'
      },

      // Dynamic code evaluation
      {
        pattern: /eval\s*\(/gi,
        type: 'dynamic_evaluation',
        severity: 'high',
        description: 'Uses eval() for dynamic code execution'
      },
      {
        pattern: /Function\s*\(/gi,
        type: 'dynamic_evaluation',
        severity: 'high',
        description: 'Uses Function constructor for dynamic code'
      },
      {
        pattern: /setTimeout\s*\(\s*["'`][^"'`]*["'`]/gi,
        type: 'dynamic_evaluation',
        severity: 'medium',
        description: 'Uses setTimeout with string code'
      },
      {
        pattern: /setInterval\s*\(\s*["'`][^"'`]*["'`]/gi,
        type: 'dynamic_evaluation',
        severity: 'medium',
        description: 'Uses setInterval with string code'
      },

      // Data access and manipulation
      {
        pattern: /document\.cookie/gi,
        type: 'cookie_access',
        severity: 'medium',
        description: 'Accesses document cookies'
      },
      {
        pattern: /localStorage/gi,
        type: 'local_storage',
        severity: 'low',
        description: 'Accesses localStorage'
      },
      {
        pattern: /sessionStorage/gi,
        type: 'local_storage',
        severity: 'low',
        description: 'Accesses sessionStorage'
      },

      // DOM manipulation
      {
        pattern: /document\.write/gi,
        type: 'dom_manipulation',
        severity: 'medium',
        description: 'Uses document.write()'
      },
      {
        pattern: /innerHTML\s*=/gi,
        type: 'dom_manipulation',
        severity: 'low',
        description: 'Modifies innerHTML'
      },
      {
        pattern: /outerHTML\s*=/gi,
        type: 'dom_manipulation',
        severity: 'medium',
        description: 'Modifies outerHTML'
      },

      // Obfuscation techniques
      {
        pattern: /atob\s*\(/gi,
        type: 'obfuscation',
        severity: 'medium',
        description: 'Uses base64 decoding (atob)'
      },
      {
        pattern: /btoa\s*\(/gi,
        type: 'obfuscation',
        severity: 'low',
        description: 'Uses base64 encoding (btoa)'
      },
      {
        pattern: /String\.fromCharCode/gi,
        type: 'obfuscation',
        severity: 'medium',
        description: 'Uses String.fromCharCode for obfuscation'
      },
      {
        pattern: /unescape\s*\(/gi,
        type: 'obfuscation',
        severity: 'medium',
        description: 'Uses unescape() function'
      },

      // Crypto mining indicators
      {
        pattern: /WebAssembly/gi,
        type: 'crypto_mining',
        severity: 'medium',
        description: 'Uses WebAssembly (potential crypto mining)'
      },
      {
        pattern: /Worker\s*\(/gi,
        type: 'crypto_mining',
        severity: 'low',
        description: 'Creates web workers (potential crypto mining)'
      },

      // Fingerprinting
      {
        pattern: /navigator\./gi,
        type: 'fingerprinting',
        severity: 'low',
        description: 'Accesses navigator properties'
      },
      {
        pattern: /screen\./gi,
        type: 'fingerprinting',
        severity: 'low',
        description: 'Accesses screen properties'
      },
      {
        pattern: /canvas/gi,
        type: 'fingerprinting',
        severity: 'low',
        description: 'Uses canvas (potential fingerprinting)'
      },

      // Timing attacks
      {
        pattern: /performance\.now/gi,
        type: 'timing_attack',
        severity: 'low',
        description: 'Uses high-resolution timing'
      },
      {
        pattern: /Date\.now/gi,
        type: 'timing_attack',
        severity: 'info',
        description: 'Uses timestamp functions'
      }
    ]

    // Check each pattern
    threatPatterns.forEach(threat => {
      const matches = code.match(threat.pattern)
      if (matches) {
        patterns.push({
          pattern: threat.pattern.source,
          matches: matches.length,
          type: threat.type
        })

        behaviors.push({
          type: threat.type,
          severity: threat.severity,
          description: threat.description,
          details: {
            pattern: threat.pattern.source,
            matches: matches.length,
            examples: matches.slice(0, 3) // First 3 matches
          },
          timestamp: new Date()
        })

        logs.push({
          level: threat.severity === 'critical' || threat.severity === 'high' ? 'warning' : 'info',
          message: `Detected: ${threat.description}`,
          timestamp: new Date()
        })
      }
    })

    // Analyze code complexity and obfuscation
    const complexity = analyzeComplexity(code)
    const obfuscation = analyzeObfuscation(code)

    // Add complexity-based behaviors
    if (complexity.score > 80) {
      behaviors.push({
        type: 'obfuscation',
        severity: 'medium',
        description: 'Code has high complexity (potential obfuscation)',
        details: complexity,
        timestamp: new Date()
      })
    }

    if (obfuscation.score > 70) {
      behaviors.push({
        type: 'obfuscation',
        severity: 'high',
        description: 'Code appears to be obfuscated',
        details: obfuscation,
        timestamp: new Date()
      })
    }

    const analysisTime = Date.now() - startTime

    logs.push({
      level: 'info',
      message: `Static analysis completed in ${analysisTime}ms`,
      timestamp: new Date()
    })

    return {
      behaviors,
      logs,
      patterns,
      complexity,
      obfuscation,
      analysisTime
    }

  } catch (error) {
    logs.push({
      level: 'error',
      message: `Static analysis failed: ${error.message}`,
      timestamp: new Date()
    })

    throw {
      type: 'ANALYSIS_ERROR',
      message: 'Static code analysis failed',
      details: error.message
    }
  }
}

function analyzeComplexity(code) {
  const lines = code.split('\n').length
  const characters = code.length
  const functions = (code.match(/function/gi) || []).length
  const loops = (code.match(/for\s*\(|while\s*\(|do\s*{/gi) || []).length
  const conditionals = (code.match(/if\s*\(|switch\s*\(/gi) || []).length
  const operators = (code.match(/[+\-*/%=<>!&|^~]/g) || []).length

  // Calculate complexity score (0-100)
  const score = Math.min(100, 
    (lines * 0.5) + 
    (characters * 0.01) + 
    (functions * 5) + 
    (loops * 8) + 
    (conditionals * 6) + 
    (operators * 0.2)
  )

  return {
    score: Math.round(score),
    lines,
    characters,
    functions,
    loops,
    conditionals,
    operators
  }
}

function analyzeObfuscation(code) {
  let score = 0
  const indicators = []

  // Check for common obfuscation indicators
  const obfuscationPatterns = [
    { pattern: /[a-zA-Z_$][a-zA-Z0-9_$]{20,}/g, weight: 10, name: 'Very long identifiers' },
    { pattern: /\\x[0-9a-fA-F]{2}/g, weight: 15, name: 'Hex escape sequences' },
    { pattern: /\\u[0-9a-fA-F]{4}/g, weight: 15, name: 'Unicode escape sequences' },
    { pattern: /['"]\s*\+\s*['"]/g, weight: 8, name: 'String concatenation' },
    { pattern: /\[['"]\w+['"]\]/g, weight: 5, name: 'Bracket notation property access' },
    { pattern: /eval\s*\(/gi, weight: 20, name: 'Dynamic evaluation' },
    { pattern: /Function\s*\(/gi, weight: 20, name: 'Function constructor' },
    { pattern: /[a-zA-Z_$]\w*\[\d+\]/g, weight: 3, name: 'Array index access' }
  ]

  obfuscationPatterns.forEach(({ pattern, weight, name }) => {
    const matches = code.match(pattern)
    if (matches) {
      const points = Math.min(weight * matches.length, weight * 5) // Cap per pattern
      score += points
      indicators.push({
        name,
        matches: matches.length,
        points
      })
    }
  })

  // Check character distribution
  const charDistribution = analyzeCharacterDistribution(code)
  if (charDistribution.entropy > 4.5) {
    score += 15
    indicators.push({
      name: 'High character entropy',
      entropy: charDistribution.entropy,
      points: 15
    })
  }

  return {
    score: Math.min(100, score),
    indicators,
    entropy: charDistribution.entropy
  }
}

function analyzeCharacterDistribution(code) {
  const chars = {}
  for (const char of code) {
    chars[char] = (chars[char] || 0) + 1
  }

  const total = code.length
  let entropy = 0

  for (const count of Object.values(chars)) {
    const probability = count / total
    entropy -= probability * Math.log2(probability)
  }

  return { entropy }
}
