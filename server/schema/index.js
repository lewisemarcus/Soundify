// import { Query as _Query, Mutation as _Mutation } from "./Users.js";

// const Query = {
//   ..._Query,
// };
// const Mutation = {
//   ..._Mutation,
// };

// export { Query, Mutation };

// const usersResolvers = require("./Users");

// module.exports = {
//   Query: {
//     ...usersResolvers.Query,
//   },
//   Mutation: {
//     ...usersResolvers.Mutation,
//   },
// };

import typeDefs from "./typeDefs.js";
import resolvers from "./Users.js";

export default { typeDefs, resolvers };
