import User from '../../models/user.model';
import bcrypt from 'bcrypt';
import { signToken } from '../../config';

export default class Users {
  static addUser(request, response) {
    const user = new User();
    user.email = request.body.email;
    user.password = request.body.password;
    user.save((error, user) => {
      if (!error) {
        const token = signToken({ id: user.id });
        return response.send({ token });
      }
      return response.status(500).send({ error: error.message });
    });
  }

  static signIn(request, response) {
    const { email } = request.body;
    const { password } = request.body;
    return User.findOne({ email }, (error, user) => {
      if (!error) {
        return user.comparePassword(password, (err, isMatch) => {
          if (!err && isMatch) {
            const token = signToken({ id: user.id });
            return response.send({ token });
          }
          return response.status(400).send({ error: 'invalid credentials' });
        });
      }
      return response.status(500).send({ error });
    });
  }
}
