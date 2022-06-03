import { gql } from "@apollo/client"

export const DELETE_COMMENT = gql`
    mutation removeComment($songId: ID!, $commentId: ID!, $token: String!) {
        removeComment(songId: $songId, commentId: $commentId, token: $token) {
            _id
            thoughtText
            thoughtAuthor
            createdAt
            comments {
                _id
                commentText
                createdAt
            }
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
