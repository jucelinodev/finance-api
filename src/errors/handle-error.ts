class HandleError {
  constructor(public readonly message: string, public readonly statusCode = 400) {}
}

export default HandleError
