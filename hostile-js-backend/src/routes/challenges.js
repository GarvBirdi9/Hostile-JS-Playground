import express from 'express'

const router = express.Router()

// Mock challenges data
const challenges = [
  {
    id: 'challenge-1',
    title: 'Cookie Stealer',
    description: 'Write JavaScript code that attempts to steal cookies without being detected',
    difficulty: 'beginner',
    objective: 'Access document.cookie and send it to an external server',
    hints: [
      'Try using different methods to access cookies',
      'Consider obfuscation techniques',
      'Think about timing and stealth'
    ],
    maxScore: 100,
    category: 'data_exfiltration'
  },
  {
    id: 'challenge-2',
    title: 'Stealth Eval',
    description: 'Execute dynamic code using eval() while avoiding detection',
    difficulty: 'intermediate',
    objective: 'Use eval() or similar functions without triggering high-severity alerts',
    hints: [
      'Consider alternative dynamic execution methods',
      'Try encoding or obfuscating the eval call',
      'Look into Function constructor alternatives'
    ],
    maxScore: 150,
    category: 'dynamic_evaluation'
  },
  {
    id: 'challenge-3',
    title: 'Network Ninja',
    description: 'Make network requests without being detected by the analysis engine',
    difficulty: 'advanced',
    objective: 'Send data to external servers while minimizing detection',
    hints: [
      'Explore different request methods',
      'Consider timing and frequency',
      'Think about payload obfuscation'
    ],
    maxScore: 200,
    category: 'network_request'
  },
  {
    id: 'challenge-4',
    title: 'Obfuscation Master',
    description: 'Create heavily obfuscated code that still executes malicious actions',
    difficulty: 'expert',
    objective: 'Write obfuscated code with a low obfuscation detection score',
    hints: [
      'Use multiple obfuscation techniques',
      'Balance complexity with functionality',
      'Consider character encoding methods'
    ],
    maxScore: 250,
    category: 'obfuscation'
  }
]

// Get all challenges
router.get('/', (req, res) => {
  const { difficulty, category } = req.query
  
  let filteredChallenges = challenges
  
  if (difficulty) {
    filteredChallenges = filteredChallenges.filter(c => c.difficulty === difficulty)
  }
  
  if (category) {
    filteredChallenges = filteredChallenges.filter(c => c.category === category)
  }
  
  res.json({
    success: true,
    challenges: filteredChallenges,
    total: filteredChallenges.length,
    timestamp: new Date().toISOString()
  })
})

// Get specific challenge
router.get('/:id', (req, res) => {
  const { id } = req.params
  const challenge = challenges.find(c => c.id === id)
  
  if (!challenge) {
    return res.status(404).json({
      error: 'Challenge not found',
      timestamp: new Date().toISOString()
    })
  }
  
  res.json({
    success: true,
    challenge,
    timestamp: new Date().toISOString()
  })
})

// Submit challenge attempt
router.post('/:id/submit', async (req, res) => {
  try {
    const { id } = req.params
    const { code } = req.body
    
    const challenge = challenges.find(c => c.id === id)
    if (!challenge) {
      return res.status(404).json({
        error: 'Challenge not found',
        timestamp: new Date().toISOString()
      })
    }
    
    if (!code) {
      return res.status(400).json({
        error: 'Code is required',
        timestamp: new Date().toISOString()
      })
    }
    
    // TODO: Integrate with analysis engine to score the attempt
    // For now, return a mock response
    const mockScore = Math.floor(Math.random() * challenge.maxScore)
    const detected = mockScore < challenge.maxScore * 0.7 // 70% threshold
    
    const feedback = generateFeedback(challenge, mockScore, detected)
    
    res.json({
      success: true,
      result: {
        challengeId: id,
        score: mockScore,
        maxScore: challenge.maxScore,
        detected,
        feedback,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    res.status(500).json({
      error: 'Challenge submission failed',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Get challenge leaderboard
router.get('/:id/leaderboard', (req, res) => {
  // TODO: Implement actual leaderboard with database
  const mockLeaderboard = [
    { rank: 1, username: 'HackerPro', score: 245, timestamp: new Date() },
    { rank: 2, username: 'CodeNinja', score: 230, timestamp: new Date() },
    { rank: 3, username: 'ScriptKiddie', score: 180, timestamp: new Date() }
  ]
  
  res.json({
    success: true,
    leaderboard: mockLeaderboard,
    timestamp: new Date().toISOString()
  })
})

function generateFeedback(challenge, score, detected) {
  const percentage = (score / challenge.maxScore) * 100
  
  let feedback = []
  
  if (detected) {
    feedback.push('❌ Your code was detected by the analysis engine')
    feedback.push('💡 Try using more sophisticated obfuscation techniques')
  } else {
    feedback.push('✅ Great! Your code avoided detection')
  }
  
  if (percentage < 30) {
    feedback.push('🔴 Low score - your code needs more malicious functionality')
  } else if (percentage < 60) {
    feedback.push('🟡 Moderate score - good start but room for improvement')
  } else if (percentage < 90) {
    feedback.push('🟢 High score - excellent work!')
  } else {
    feedback.push('🏆 Outstanding! You\'ve mastered this challenge')
  }
  
  // Challenge-specific feedback
  switch (challenge.category) {
    case 'data_exfiltration':
      feedback.push('💡 Consider different methods of accessing and transmitting data')
      break
    case 'dynamic_evaluation':
      feedback.push('💡 Explore alternatives to direct eval() usage')
      break
    case 'network_request':
      feedback.push('💡 Think about timing and request patterns')
      break
    case 'obfuscation':
      feedback.push('💡 Balance obfuscation complexity with execution success')
      break
  }
  
  return feedback
}

export default router
