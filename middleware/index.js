
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { Users } from '../models';

dotenv.config();

/**
 *
 *
 * @export
 * @class Authorization
 */
export default class Authorization {
  /**
   * Check if user is an administrator
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} auth status
   *
   * @memberof Authorization
   */
  static checkAdmin(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['more-recipe-access'];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return setStatus(res, { message: 'Invalid authorization status' }, 401);
      }
      Users.findAll({})
        .then(() => {
          if (decoded.moniker !== 'admin') {
            return setStatus(
              res,
              { success: false, status: 'Not Authorized' },
              401
            );
          }
          return next();
        })
        .catch(err => setStatus(res, { error: err.message }, 501));
    });
  }

  /**
   * Verify token
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @memberof Authorization
   *
   * @returns {object} Auth status
   */
  static verifyToken(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['more-recipe-access'];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return setStatus(
            res,
            { message: 'Invalid authorization status' },
            401
          );
        }
        return Users.findById(decoded.id)
          .then((user) => {
            if (!user) return setStatus(res, { error: 'user not found' }, 404);
            req.decoded = decoded;
            return next();
          })
          .catch(err => setStatus(res, { error: err.message }, 500));
      });
    } else {
      return setStatus(res, { error: 'Invalid authorization status' }, 401);
    }
  }
