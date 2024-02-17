const authMiddleware = (req, res, next) => {
    const config = {
      active: true,
    };
  
    if (config.active) {
      next();
    } else {
      console.log("Authentication required");
      res.status(401).send("Unauthorized");
    }
  };
  
  module.exports = authMiddleware;