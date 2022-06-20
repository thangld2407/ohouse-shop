module.exports = {
  errorHandler(error) {
    let tmp_err = {
      message: error.message,
      status: false,
      code: error.code,
      data: error.data,
    };
    return tmp_err;
  },
};
