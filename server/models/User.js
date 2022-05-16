import pkg from "mongoose";
const { model, Schema } = pkg;

const userSchema = new Schema({
  username: { type: String, required: true, default: null },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
    unique: true,
  },
  password: { type: String, required: true, minlength: 5 },
  token: { type: String },
});

export default model("User", userSchema);
