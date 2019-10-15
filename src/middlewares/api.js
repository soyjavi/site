import Storage from 'vanilla-storage';

import MAP from '../../map.json';
import { C } from '../common';

const { STORE } = C;

export default (req, res, next) => {
  const url = req.originalUrl.split('/')[2].split('?')[0];
  const route = MAP[url];
  let error;

  if (!route) error = `Unknown route: ${url}`;
  else {
    const { required = [], optional = [] } = route;
    const routeProps = required.concat(optional);
    const props = {};

    Object.keys(req.props).forEach((key) => {
      if (routeProps.includes(key)) props[key] = req.props[key];
    });

    if (required.length > 0) {
      const propsKeys = Object.keys(props);
      const requiredParameters = required.filter(x => !propsKeys.includes(x));

      if (requiredParameters.length > 0) error = `Required parameters: ${requiredParameters.join(', ')}`;
    }

    const authorization = req.authorization || req.headers.authorization;
    let session;

    if (route.secure && !authorization) error = 'Acceso no permitido';
    else if (route.secure) {
      const users = new Storage(STORE.USERS);
      session = users.get('admins').findOne({ fingerprint: authorization });
      if (!session) error = 'Acceso no permitido';
    }

    req.session = session;
    req.props = props;
  }

  if (error) return res.status(400).json({ error });

  return next();
};
