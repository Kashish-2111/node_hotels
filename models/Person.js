const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    reuired: true,
    unique: true,
  },
  address: {
    type: String,
    reuired: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  //hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();

  try {
    //hash password generation

    const salt = await bcrypt.genSalt(10); //for generating salt where jitna bda no utna complex salt - 10 is rounds parameter bht zyada bhi ni kyuki hashing algo utna computational cost lega
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    //override the plain text with hash
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//how this workss
/*
kashish ------> fasbdkudjbveruvdbks;
login--->kashisqwe
fasbdkudjbveruvdbks----->extract salt from this hash 
salt + kashisqwe ---->hryrydhdegegsbshjjqa

compare these two hash and generate result
*/

//create person model

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
