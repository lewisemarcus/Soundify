import { gql } from "@apollo/client";

export const qrySongs = gql`
  query allSongs {
    songs {
      cover
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
`;

export const GET_SONGS = gql`
  query song($title: String!) {
    song(title: $title) {
      title
      cover
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
`;

export const GET_GENRES = gql`
  query songByGenre($genre: String!) {
    songByGenre(genre: $genre) {
      title
      cover
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
`;
export const GET_SONG = gql`
  query songById($songId: ID!) {
    songById(_id: $songId) {
      title
      cover
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
`;

export const GET_USER_SONGS = gql`
  query userSongs($username: String!) {
    userSongs(username: $username) {
      title
      genre
      cover
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
`;
export const GET_USER_PLAYLIST = gql`
  query userPlaylists($owner: String!) {
    userPlaylists(owner: $owner) {
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
`;
export const GET_PLAYLIST = gql`
  query playlist($_id: ID!) {
    playlist(_id: $_id) {
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
`;
