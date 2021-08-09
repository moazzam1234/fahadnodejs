const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
require("dotenv").config();

const Model = new Schema({

         fullName: {
             type: String,
          default: null
  },
            email: {
             type: String,
  },
         password: {
             type: String,
  },
          details: {
             type: String,
  },

         userType: [{
             type: String,}, ],
  assignedCourses: [{
             type: mongoose.Schema.Types.ObjectId,
              ref: "Course",}, ],

            local: {
             hash: {
             type: String},
             salt: {
             type: String},
  },
  // accessToken: { type: String },
  // refreshToken: { type: String },
  // resetPasswordToken: { type: String, required: false },
  // resetPasswordExpires: { type: Date, required: false },
}, {
      strict: false,
  versionKey: false,
  timestamps: true,
});
Model.methods.setPassword = function (password) {
  this.local.salt = crypto.randomBytes(16).toString("hex");
  this.local.hash = crypto
    .pbkdf2Sync(password, this.local.salt, 128, 128, "sha512")
    .toString("hex");
};

module.exports = mongoose.model("User", Model);