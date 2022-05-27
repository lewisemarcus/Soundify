import { gql } from "@apollo/client"

export const GET_SONGS = gql`
    query song($title: String!) {
        song(title: $title) {
            title
        }
    }
`
