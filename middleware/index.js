import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

/**
 *
 *
 * @export
 * @class Authorization
 */
export default class Authorization {
  /**
   * Verify token
   *
   * @param {object} request
   * @param {object} response
   * @param {object} next
   *
   * @memberof Authorization
   *
   * @returns {object} Auth status
   */
  static verifyToken(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['todo-access'];
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return response.status(400).send({ message: 'Invalid authorization' });
        }
        return User.findById(decoded.id, (err, user) => {
          if (!err) {
            request.decoded = decoded;
            return next();
          }
          return response.status(404).send({ message: 'User not found' });
        });
      });
    }
    return response.status(400).send({ message: 'Invalid authorization' });
  }
}
