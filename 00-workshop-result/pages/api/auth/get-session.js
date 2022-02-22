import { withIronSessionApiRoute } from 'iron-session/next';
import { cookieSettings } from '../../../lib/auth';
import { decode } from '../../../lib/jwt';

async function handler(req, res) {
  const jwt = req.session.jwt;

  console.log(jwt);

  res.json({
    session: jwt
  });
}

export default withIronSessionApiRoute(handler, cookieSettings);