import { gql } from "apollo-server"

export default gql `
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
        userByUsername(username: String!): User
        user(_id: ID!): User
        songs: [Song]
        songByGenre(genre: String!): [Song]
        userSongs(username: String!): [Song]
        song(title: String!): [Song]
        me: User
        songById(_id: ID!): Song
        userPlaylists(owner: String!): [Playlist]
        playlist(plTitle: String!): Playlist
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        removeSong(songId: ID!): Song
        removeComment(
            songId: String!
            commentId: String!
            token: String!
            commentAuthor: String!
        ): Song
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
    }
`