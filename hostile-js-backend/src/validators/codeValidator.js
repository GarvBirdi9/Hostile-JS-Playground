export function validateCodeInput(code) {
  const errors = []

  // Check if code is provided
  if (!code) {
    errors.push('Code is required')
    return { isValid: false, errors }
  }

  // Check if code is a string
  if (typeof code !== 'string') {
    errors.push('Code must be a string')
    return { isValid: false, errors }
  }

  // Check code length limits
  if (code.length === 0) {
    errors.push('Code cannot be empty')
  }

  if (code.length > 100000) { // 100KB limit
    errors.push('Code is too large (maximum 100KB)')
  }

  // Check for potentially dangerous patterns that should be blocked entirely
  const blockedPatterns = [
    {
      pattern: /require\s*\(/gi,
      message: 'Node.js require() is not allowed'
    },
    {
      pattern: /import\s+.*\s+from/gi,
      message: 'ES6 imports are not allowed'
    },
    {
      pattern: /process\./gi,
      message: 'Process object access is not allowed'
    },
    {
      pattern: /__dirname|__filename/gi,
      message: 'Node.js globals are not allowed'
    },
    {
      pattern: /fs\.|path\.|os\./gi,
      message: 'Node.js modules are not allowed'
    }
  ]

  blockedPatterns.forEach(({ pattern, message }) => {
    if (pattern.test(code)) {
      errors.push(message)
    }
  })

  // Check for excessive nesting or complexity
  const nestingLevel = checkNestingLevel(code)
  if (nestingLevel > 20) {
    errors.push('Code has excessive nesting (maximum 20 levels)')
  }

  // Check for too many function definitions
  const functionCount = (code.match(/function\s+\w+/gi) || []).length
  if (functionCount > 50) {
    errors.push('Too many function definitions (maximum 50)')
  }

  // Check for extremely long lines
  const lines = code.split('\n')
  const longLines = lines.filter(line => line.length > 1000)
  if (longLines.length > 0) {
    errors.push('Code contains extremely long lines (maximum 1000 characters per line)')
  }

  // Check for potential infinite loops (basic detection)
  const suspiciousLoops = [
    /while\s*\(\s*true\s*\)/gi,
    /for\s*\(\s*;\s*;\s*\)/gi,
    /while\s*\(\s*1\s*\)/gi
  ]

  suspiciousLoops.forEach(pattern => {
    if (pattern.test(code)) {
      errors.push('Code contains potential infinite loop patterns')
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    stats: {
      length: code.length,
      lines: lines.length,
      functions: functionCount,
      nestingLevel
    }
  }
}

function checkNestingLevel(code) {
  let maxLevel = 0
  let currentLevel = 0

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    
    if (char === '{' || char === '(' || char === '[') {
      currentLevel++
      maxLevel = Math.max(maxLevel, currentLevel)
    } else if (char === '}' || char === ')' || char === ']') {
      currentLevel--
    }
  }

  return maxLevel
}
