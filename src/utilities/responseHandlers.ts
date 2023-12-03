export default class ResponseHandlers {

  static sendSuccessResponse (data: any, message: string) {
    return {
      data: data,
      message: message
    }
  }

  static sendErrorResponse (message: string) {
    return {
      data: null,
      error: message
    }
  }
}