const sendResponse = (res, code, message, data = null, error = null) => {
    const response = {
      code,
      message,
      data,
      error,
    };
    
    res.status(code).json(response);
  };
  
  module.exports = sendResponse;
  