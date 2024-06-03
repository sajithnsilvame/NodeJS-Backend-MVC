const AuthMiddleware = (req, res, next) => {
  console.log("Auth Middleware called");
  next();
};

export default AuthMiddleware;
