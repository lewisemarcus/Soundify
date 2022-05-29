import { gql } from "@apollo/client"

export const GET_SONGS = gql`
    query song($title: String!) {
        song(title: $title) {
            title
            genre
            link
            artist
            uploaded
            comments
            filename
            _id
            username
        }
    }
`

export const GET_GENRES = gql`
    query songs($genre: String!) {
        songByGenre(genre: $genre) {
            title
            genre
            link
            artist
            uploaded
            comments
            filename
            _id
            username
        }
    }
`
