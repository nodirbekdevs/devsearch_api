const {Schema, model} = require('mongoose')

const Message = model('Message', new Schema({
  sender: {type: Schema.Types.ObjectId, ref: 'User'},
  recipient: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  email: {type: String},
  subject: {type: String},
  body: {type: String},
  isRead: {type: Boolean, default: false}
}, {timestamps: true}))

module.exports = Message
