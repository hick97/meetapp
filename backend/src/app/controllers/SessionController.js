import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../models/User';
import Meetup from '../models/Meetup';

class SessionController {
  async store(req, res) {
    // Schema validation to user session
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Invalid password.' });
    }

    // Cheking if user is organizer
    const isOrganizer = await Meetup.findOne({
      where: {
        user_id: user.id,
      },
    });

    let organizer = true;
    if (!isOrganizer) organizer = false;

    const { id, name } = user;

    // Token generation
    return res.json({
      user: {
        id,
        name,
        email,
        organizer,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
