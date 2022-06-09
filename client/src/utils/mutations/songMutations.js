import { gql } from "@apollo/client"
export const DELETE_SONG = gql`
    mutation removeSong($songId: String!, $token: String!) {
        removeSong(songId: $songId, token: $token) {
            title
            genre
            link
            artist
            uploaded
            filename
            _id
            username
        }
    }
`
