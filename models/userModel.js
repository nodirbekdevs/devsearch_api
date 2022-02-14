const {Schema, model} = require('mongoose')
const {sign} = require('jsonwebtoken')
const {secret} = require('./../utils/keys')

const user = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  name: {type: String},
  email: {type: String},
  location: {type: String},
  shortIntro: {type: String},
  bio: {type: String},
  profileImage: {type: String, default: ''},
  socialGithub: {type: String},
  socialTwitter: {type: String},
  socialLinkedLn: {type: String},
  socialYoutube: {type: String},
  socialWebsite: {type: String},
}, {timestamps: true})

user.methods.generateAuthToken = function () {
  const token = sign({ _id: this._id, isAdmin: this.isAdmin }, secret);
  return token;
}

const User = model('User', user)

module.exports = User
