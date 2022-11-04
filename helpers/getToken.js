const getToken = (req) => {
  const authHeader = req.headers?.authorization;
  if(authHeader) return token = authHeader.split(" ")[1];
  return
}
;

module.exports = getToken;
