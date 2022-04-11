const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.body.token || req.query.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({error:`not authenticated`});
  }
  try {
    const decoded = jwt.verify(token, "your-secret");
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).json({error:`not authenticated`});
  }
  return next();
};

module.exports = verifyToken;