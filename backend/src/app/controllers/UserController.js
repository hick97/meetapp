import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldpassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      // Checking if email already exists
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldpassword && !(await user.checkPassword(oldpassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
