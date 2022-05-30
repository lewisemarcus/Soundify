import { gql } from "@apollo/client"

export const ADD_COMMENT = gql`
    mutation addComment($songId: ID!, $commentInput: CommentInput!) {
        addComment(title: $title) {
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
