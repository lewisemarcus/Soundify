import { gql } from "apollo-server"

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
        username: String
        uploaded: String
        comments: [Comment]!
    }

    type Playlist {
        _id: ID
        title: String
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
        username: String
        uploaded: String
    }

    input CommentInput {
        commentText: String
        username: String
        createdAt: String
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
        userPlaylists(owner: String!): [Playlist]
        playlist(plTitle: String!): Playlist
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        addSong(songInput: SongInput): Song
        removeSong(songId: ID!): Song
        removeComment(songId: ID!, commentId: ID!): Song
        addComment(songId: ID!, commentInput: CommentInput): Song
    }
`

// module.exports = gql`
//     type User {
//         username: String
//         email: String
//         password: String
//         token: String
//     }

//     input RegisterInput {
//         username: String
//         email: String
//         password: String
//         confirmPassword: String
//     }

//     input LoginInput {
//         email: String
//         password: String
//     }

//     type Query {
//         user(id: ID!): User
//     }

//     type Mutation {
//         registerUser(registerInput: RegisterInput): User
//         loginUser(loginInput: LoginInput): User
//     }
// `
