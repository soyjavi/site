import onFinished from 'on-finished';

export default (req, res, next) => {
  const { headers: { cookie = '' }, originalUrl = '' } = req;
  const today = new Date();
  const timestamp = today.getTime();

  // -- Get cookies
  const cookies = {};
  cookie.split(';').forEach((item) => {
    const parts = item.split('=');
    cookies[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  req.authorization = cookies.authorization;

  // -- Set permissive CORS header
  res.setHeader('Access-Control-Allow-Origin', '*');

  // -- Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');

  // -- Parse all parameters as props of request
  req.props = Object.assign({}, req.params, req.query, req.body);

  onFinished(res, () => {
    console.log(`${req.method} ${originalUrl} ${res.statusCode} - - ${new Date().getTime() - timestamp} ms`);
  });

  next();
};
