import User                                      from '../models/user.model.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { userAlreadyExists }                     from '../helpers/index.js';

const register = async (req, res) => {
  const {
          name,
          email,
          password,
        } = req.body;
  
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  
  if (await userAlreadyExists(email)) {
    throw new BadRequestError('User with that email already exists');
  }
  
  const user = await User.create({ name, email, password });
  
  const token = user.createJWT();
  
  return res.status(201).json({ user: user.getData(), token });
  
  /*try {
   const user = await User.create(req.body);
   
   return res.status(201).json({ user });
   }
   catch (error) {
   next(error); // pass error to error handling middleware
   // return res.status(500).json({ msg: "There was an error creating a new user" });
   }*/
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  
  const user = await userAlreadyExists(email);
  
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  
  if (!await user.comparePassword(password)) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  
  const token = user.createJWT();
  
  return res.status(200).json({
                                user:     user.getData(),
                                token,
                                location: user.location,
                              });
};

const update = async (req, res) => {
  const {
          email,
          name,
          lastName,
          location,
        } = req.body;
  
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  
  const user = await User.findOne({ _id: req.user.userId });
  
  user.email    = email;
  user.name     = name;
  user.lastName = lastName;
  user.location = location;
  
  await user.save();
  
  const token = user.createJWT();
  
  return res.status(200).json({
                                user,
                                token,
                                location: user.location,
                              });
};

export {
  register,
  login,
  update,
};