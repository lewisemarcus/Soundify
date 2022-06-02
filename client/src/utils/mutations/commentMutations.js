import { gql } from "@apollo/client"

export const DELETE_COMMENT = gql`
    mutation removeComment($songId: ID!, $commentId: ID!) {
        removeComment(songId: $songId, commentId: $commentId) {
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
    mutation addComment($songId: ID!, $commentText: String!) {
        addComment(songId: $songId, commentText: $commentText) {
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
