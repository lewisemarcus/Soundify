const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with the email" + email,
          "USER_ALREADY_EXISTS"
        );
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "2h",
      });

      newUser.token = token;
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, "UNSAFE_STRING", {
          expiresIn: "2h",
        });
        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
