import jwt from 'jsonwebtoken';

const generateToken = (response, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  // Set JWT as HTTP-Only cookie
  response.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
  return token;
};

export default generateToken;
