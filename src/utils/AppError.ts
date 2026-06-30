export class AppError extends Error {
  public readonly isNetworkError: boolean;
  public readonly statusCode?: number;

  constructor(message: string, isNetworkError = false, statusCode?: number) {
    super(message);
    this.name = 'AppError';
    this.isNetworkError = isNetworkError;
    this.statusCode = statusCode;
    
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
