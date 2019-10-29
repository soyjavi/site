import fs from 'fs';
import path from 'path';

export default ({ params: { postUri } }, res, next) => {
  const file = path.resolve('.', `posts/${postUri}.md`);

  if (!fs.existsSync(file)) {
    res.statusCode = 404;
    throw Error(`Whoops! Parece que la url /${postUri} no existe.`);
  } else next();
};
