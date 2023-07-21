const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;

  const longerExp = 1000 * 60 * 60 * 24 * 30;

  console.log(accessTokenJWT,refreshTokenJWT );
  res
  .cookie('accessToken', accessTokenJWT, {
    httpOnly: process.env.NODE_ENV === 'production' ? false: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
    sameSite : process.env.NODE_ENV === 'production' ? 'None': undefined,
  })
  .cookie('refreshToken', refreshTokenJWT, {
    httpOnly: process.env.NODE_ENV === 'production' ? false: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + longerExp),
    sameSite : process.env.NODE_ENV === 'production' ? 'None': undefined,

  });

  console.log(res.signedCookies);
};

// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };


module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
