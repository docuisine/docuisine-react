import STATUS from "@/lib/status";

export abstract class APIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class ServerError extends APIError {
  constructor(
    message: string = "Internal Server Error",
    statusCode: number = STATUS.HTTP_500_INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

export class UserNotFoundError extends APIError {
  constructor(
    message: string = "User not found",
    statusCode: number = STATUS.HTTP_404_NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class InvalidCredentialsError extends APIError {
  constructor(
    message: string = "Invalid username or password",
    statusCode: number = STATUS.HTTP_401_UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

const errors = {
  ServerError,
  UserNotFoundError,
  InvalidCredentialsError,
};

export default errors;
