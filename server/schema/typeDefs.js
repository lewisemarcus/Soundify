import { gql } from "apollo-server";

export default gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    token: String
    songs: [Song]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Song {
    _id: ID
    title: String
    genre: String
    filename: String
    link: String
    cover: String
    tags: [String]
    artist: String
    username: String
    uploaded: String
    comments: [Comment]!
  }

  type Playlist {
    _id: ID
    plTitle: String
    owner: String
    songs: [Song]!
  }
  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input SongInput {
    title: String
    genre: String
    filename: String
    link: String
    tags: [String]
    username: String
  }

  type Query {
    songByArtist(username: String!): [Song]
    users: [User]
    user(_id: ID!): User
    allSongs: [Song]
    songByGenre(genre: String!): [Song]
    userSongs(username: String!): [Song]
    song(title: String!): [Song]
    me: User
    songById(_id: ID!): Song
    userPlaylists(owner: String!): [Playlist]
    playlist(_id: ID!): Playlist
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    removeComment(
      songId: String!
      commentId: String!
      token: String!
      commentAuthor: String!
    ): Song
    removePlaylist(playlistId: ID!, token: String!): Playlist
    removeSong(songId: String!, token: String!, key: String!): Song
    addComment(
      songId: ID!
      commentText: String!
      commentAuthor: String!
      token: String!
    ): Song
    createPlaylist(
      playlistname: String!
      songId: ID!
      username: String!
    ): Playlist
    addToPlaylist(_id: String!, songId: ID!): Playlist
    removeFromPlaylist(token: String!, songId: ID!, playlistId: ID!): Playlist
  }
`;
