export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.status = 400
    error.message = 'Validation Error'
    error.details = Object.values(err.errors).map(e => e.message)
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.status = 401
    error.message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    error.status = 401
    error.message = 'Token expired'
  }

  // Mongoose errors
  if (err.name === 'CastError') {
    error.status = 400
    error.message = 'Invalid ID format'
  }

  // Duplicate key error
  if (err.code === 11000) {
    error.status = 400
    error.message = 'Duplicate field value'
    error.details = Object.keys(err.keyValue)
  }

  // Sandbox execution errors
  if (err.type === 'SANDBOX_ERROR') {
    error.status = 422
    error.message = 'Code execution failed'
    error.details = err.details
  }

  // Security analysis errors
  if (err.type === 'ANALYSIS_ERROR') {
    error.status = 422
    error.message = 'Security analysis failed'
    error.details = err.details
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && error.status === 500) {
    error.message = 'Internal Server Error'
    delete error.details
  }

  res.status(error.status).json({
    error: error.message,
    ...(error.details && { details: error.details }),
    timestamp: error.timestamp,
    path: error.path,
    method: error.method,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
