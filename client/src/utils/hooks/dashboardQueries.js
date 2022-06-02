import { gql } from '@apollo/client';

export const GET_SONGS = gql`
  query getSong($title: String!) {
    song(title: $title) {
      title
    }
  }
`;
