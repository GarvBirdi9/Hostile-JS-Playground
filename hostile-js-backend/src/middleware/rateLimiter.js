// Simple in-memory rate limiter
const requests = new Map()

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100 // Max requests per window

  // Clean old entries
  for (const [key, data] of requests.entries()) {
    if (now - data.resetTime > windowMs) {
      requests.delete(key)
    }
  }

  // Get or create request data for this IP
  let requestData = requests.get(ip)
  if (!requestData) {
    requestData = {
      count: 0,
      resetTime: now
    }
    requests.set(ip, requestData)
  }

  // Reset if window has passed
  if (now - requestData.resetTime > windowMs) {
    requestData.count = 0
    requestData.resetTime = now
  }

  // Check if limit exceeded
  if (requestData.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((windowMs - (now - requestData.resetTime)) / 1000),
      timestamp: new Date().toISOString()
    })
  }

  // Increment counter
  requestData.count++

  // Add rate limit headers
  res.set({
    'X-RateLimit-Limit': maxRequests,
    'X-RateLimit-Remaining': Math.max(0, maxRequests - requestData.count),
    'X-RateLimit-Reset': new Date(requestData.resetTime + windowMs).toISOString()
  })

  next()
}
