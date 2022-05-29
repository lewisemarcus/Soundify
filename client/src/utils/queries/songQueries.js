import { gql } from "@apollo/client"

export const GET_SONGS = gql`
    query song($title: String!) {
        song(title: $title) {
            title
        }
    }
`

export const GET_GENRES = gql`
    query songs($genre: String!) {
        songByGenre(genre: $genre) {
            genre
        }
    }
`