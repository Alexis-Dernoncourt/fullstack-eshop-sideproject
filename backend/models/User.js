const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  adress: { 
    firstName: {type: String},
    lastName: {type: String},
    postalCode: {type: String},
    city: {type: String},
    street: {type: String},
    adressComplement: {type: String},
    streetNumber: {type: String},
    appartment: {type: Boolean, default: false},
    etage: {type: Number, default: 0}
  },
  refreshToken: { type: String, default: '' },
  validatedAccount: { type: Boolean, default: false },
  roles: { 
    User: {
      type: Number,
      default: 5891
    },
    Editor: Number,
    Admin: Number
  }
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
