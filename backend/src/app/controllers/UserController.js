import User from '../models/User';

class UserController {
  index(req, res) {}

  list(req, res) {}

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

  update(req, res) {}

  delete(req, res) {}
}

export default new UserController();
