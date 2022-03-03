//removes the need for reapeated try/catch in async

const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next)
      .catch(next);
  }
}


module.exports = catchAsync;