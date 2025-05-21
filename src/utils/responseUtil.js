export const sendSuccessResponse = (res, statusCode, message, data) => {
  const response = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

export const sendErrorResponse = (res, statusCode, message, error) => {
  const response = {
    success: false,
    message,
    error: typeof error === "object" ? error : error?.message || error,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};
