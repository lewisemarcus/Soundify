import { gql } from "@apollo/client"

export const DELETE_COMMENT = gql`
    mutation removeComment(
        $songId: String!
        $commentId: String!
        $token: String!
    ) {
        removeComment(songId: $songId, commentId: $commentId, token: $token) {
            title
            genre
            link
            artist
            uploaded
            comments {
                _id
                commentText
                commentAuthor
                createdAt
            }
            filename
            _id
            username
        }
    }
`
export const ADD_COMMENT = gql`
    mutation addComment(
        $songId: ID!
        $commentText: String!
        $commentAuthor: String!
        $token: String!
    ) {
        addComment(
            songId: $songId
            commentText: $commentText
            commentAuthor: $commentAuthor
            token: $token
        ) {
            title
            genre
            link
            artist
            uploaded
            comments {
                _id
                commentText
                commentAuthor
                createdAt
            }
            filename
            _id
            username
        }
    }
`
