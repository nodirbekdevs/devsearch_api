const {Schema, model} = require('mongoose')

const Skill = model('Skill', new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  description: {type: String}
}, {timestamps: true}))

module.exports = Skill
