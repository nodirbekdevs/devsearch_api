const {Schema, model} = require('mongoose')

const Tag = model('Tag', new Schema({
  name: {type: String, required: true}
}, {timestamps: true}))

module.exports = Tag
