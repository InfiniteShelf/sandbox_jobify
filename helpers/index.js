import User from '../models/user.model.js';

/**
 * Check if User exists and if it does it returns User model instance.
 *
 * @param {String} email
 * @returns {Promise<Query<any, any, {}, any>>}
 */
export const userAlreadyExists = async email => await User.findOne({email})
                                                          .select('+password');