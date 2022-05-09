import jwt from 'jsonwebtoken';
import {UnauthenticatedError} from '../errors/index.js';

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  
  const token = authHeader.split(' ')[1]; // Example of how token looks: Bearer
                                          // 12321039fid09fis0d9i23094932d
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    
    next();
  }
  catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  
};

export default authenticateUser;