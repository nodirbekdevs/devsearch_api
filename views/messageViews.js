const Message = require('./../models/messageModel')
const User = require('./../models/userModel')

const getMessages = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const message = await Message.find({recipient: user})
    const unReadCount = message.isRead ? message.isRead.count() : 0
    if (!user && !message && !unReadCount) return res.status(500).send({success: false})
    const response = {'message': message, 'unReadCount': unReadCount}
    return res.status(200).send(response)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getMessage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const message = await Message.find({_id: req.params.id, owner: user})
    if (!message.isRead) {
      message.isRead = true
      await message.save()
    }
    if (!user && !message) return res.status(500).send({success: false})
    return res.status(200).send(message)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const makeMessage = async (req, res) => {
  const {subject, body} = req.body
  try {
    const recipientId = await User.findById(req.params.id)
    const senderId = await User.findById(req.user._id)
    if (!senderId && !recipientId) return  res.status(500).send({success: false})
    const message = await Message.create(
      {sender: senderId, recipient: recipientId, name: senderId.name, email: senderId.email, subject, body}
    )
    if (!message) return res.status(500).send({success: false})
    return res.status(201).send({success: true})
  } catch (e) {
    return res.status(404).send(e)
  }
}

const deleteMessage = (req, res) => {
  Message.findByIdAndDelete(req.params.id).then(user => {
    if (user) return res.status(201).send({success: true})
    else return res.status(500).send({success: false})
  }).catch(e => {return res.status(404).send({success: false, error: e})})
}

module.exports = {getMessages, getMessage, makeMessage, deleteMessage}
