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
    query userPlaylists($owner: String!) {
        userPlaylists(owner: $owner) {
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
export const GET_PLAYLIST = gql `
    query playlist($_id: ID!) {
        playlist(_id: $_id) {
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