import { gql } from "@apollo/client"

export const CREATEPLAYLIST = gql`
    mutation createPlaylist(
        $playlistname: String!
        $songId: ID!
        $username: String!
    ) {
        createPlaylist(
            playlistname: $playlistname
            songId: $songId
            username: $username
        ) {
            _id
            plTitle
            owner
            songs {
                cover
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
    }
`
export const ADDTOPLAYLIST = gql`
    mutation addToPlaylist($_id: String!, $songId: ID!) {
        addToPlaylist(_id: $_id, songId: $songId) {
            _id
            plTitle
            owner
            songs {
                cover
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
    }
`
export const REMOVE_FROM_PLAYLIST = gql`
    mutation removeFromPlaylist(
        $playlistId: ID!
        $songId: ID!
        $token: String!
    ) {
        removeFromPlaylist(
            playlistId: $playlistId
            songId: $songId
            token: $token
        ) {
            _id
            plTitle
            owner
            songs {
                cover
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
    }
`
export const REMOVE_PLAYLIST = gql`
    mutation removePlaylist($playlistId: ID!, $token: String!) {
        removePlaylist(playlistId: $playlistId, token: $token) {
            _id
            plTitle
            owner
        }
    }
`
