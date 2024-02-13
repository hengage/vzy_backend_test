export enum USER_PAYMENT_STATUS {
    UNPAID = "unpaid",
    PAID = "paid",
}

export enum USER_ACCOUNT_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
}

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
  };