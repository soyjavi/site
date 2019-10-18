import fs from 'fs';
import path from 'path';

import PKG from '../../package.json';
import cache from './cache';
import C from './constants';

const {
  COPYRIGHT, DOMAIN, TITLE, DESCRIPTION, ICON, IMAGE,
  EMAIL, TWITTER,
} = C;
const folder = path.resolve('.', 'src/pages');
const bindingRegexp = new RegExp(/{{.*}}/, 'g');

export default (filename = 'index', values = {}, forceCache = true) => {
  const cacheKey = `view:${filename}`;
  let view = forceCache ? cache.get(cacheKey) : undefined;

  if (!view) {
    const uriFile = `${folder}/${filename}.html`;

    if (!fs.existsSync(uriFile)) throw new Error(`${filename} could not read correctly.`);
    view = fs.readFileSync(uriFile, 'utf8');
    cache.set(cacheKey, view);
  }

  const {
    title,
    description = DESCRIPTION,
    image,
    url,
  } = values;

  const dataSource = {
    COPYRIGHT,
    EMAIL,
    ICON: `${DOMAIN}${ICON}`,
    VERSION: PKG.version,
    TWITTER,

    ...values,
    title: title || TITLE,
    description,
    image: image || `${DOMAIN}${IMAGE}`,
    url: url ? `${DOMAIN}${url}` : DOMAIN,
  };

  Object.keys(dataSource).forEach((key) => {
    view = view.replace(new RegExp(`{{${key}}}`, 'g'), dataSource[key]);
  });

  view = view.replace(bindingRegexp, '');

  return view;
};
