import { gql } from "@apollo/client"

export const qrySongs = gql `
    query songs{
        songs{
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

export const GET_SONGS = gql `
    query song($title: String!) {
        song(title: $title) {
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

export const GET_GENRES = gql `
    query songs($genre: String!) {
        songByGenre(genre: $genre) {
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
export const GET_SONG = gql `
    query songById($songId: ID!) {
        songById(_id: $songId) {
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
export const GET_USER_SONGS = gql `
    query userSongs($username: String!) {
        userSongs(username: $username) {
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
export const GET_USER_PLAYLIST = gql `
    query userPlaylists($username: String!) {
        userPlaylists(username: $username) {
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
            playlistname
        }
    }
`