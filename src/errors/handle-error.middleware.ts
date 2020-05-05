import { Request, Response, NextFunction } from 'express'
import HandleError from './handle-error'

export default (err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HandleError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}
