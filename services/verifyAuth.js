export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    //split the space at the bearer
    const bearer = bearerHeader.split(' ');
    //Get token from string
    const bearerToken = bearer[1];

    //set the token
    req.token = bearerToken;

    //next middleweare
    next();
  } else {
    res.sendStatus(403);
  }
};