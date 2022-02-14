const {compareSync, hashSync} = require('bcryptjs')
const User = require('./../models/userModel')
const {salt} = require('./../utils/keys')


const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(500).send({success: false});
    const isValidPassword = await compareSync(req.body.password, user.password);
    if (!isValidPassword) return res.status(500).send({success: true});
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(true);
  } catch (e) {
    return res.status(404).send(e)
  }
}

const register = async (req, res) => {
  const {username, password, firstName, lastName, phone, interestedCategory} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    return res.status(409).send({message: 'Такой username уже занят. Попробуйте другой'})
  } else {
    const user = new User({username, password: hashSync(password, salt), firstName, lastName, phone, interestedCategory})
    try {
      if (!user) return res.status(500).send({success: false})
      await user.save()
      return res.status(201).send(user)
    } catch (e) {
      return res.status(404).send(e)
    }
  }
}

module.exports = {login, register}
