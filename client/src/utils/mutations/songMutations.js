import { gql } from "@apollo/client"

export const ADD_COMMENT = gql`
    mutation addComment($songId: ID!, $commentText: String!, $token: String!) {
        addComment(songId: $songId, token: $token, commentText: $commentText) {
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
