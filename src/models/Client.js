const mongoose = require("mongoose");
const validator = require("validator");

// client
const clientSchema = mongoose.Schema(
  {
    society: {
      type: String,
      required: true,
      trim: true
    },
    adress: {
      type: String,
      required: true,
      trim: true
    },
    contactFirstName: {
      type: String,
      required: true,
      trim: true
    },
    contactLastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    mail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      }
    }
  },
  {
    timestamps: true
  }
);

var Client = mongoose.model("Clients", clientSchema);

module.exports = Client;
