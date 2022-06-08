import { gql } from "@apollo/client"

export const CREATEPLAYLIST = gql `
    mutation createPlaylist(
        $playlistname: String!
        $songId: ID!
        $username: String!
    ){
        createPlaylist (
            playlistname: $playlistname
            songId: $songId
            username: $username
        ){
            _id
            plTitle
            owner
            songs {
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
    }
`
export const ADDTOPLAYLIST = gql `
    mutation addToPlaylist(
        $_id: String!
        $songId: ID!
    ){
        addToPlaylist (
            _id: $_id
            songId: $songId
        ){
            _id
            plTitle
            owner
            songs {
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
export const REMOVE_FROM_PLAYLIST = gql `
    mutation removeFromPlaylist(
        $playlistname: String!
        $songId: ID!
        $username: String!
    ){
        createPlaylist (
            playlistname: $playlistname
            songId: $songId
            username: $username
        ){
            _id
            plTitle
            owner
            songs {
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
    }
`