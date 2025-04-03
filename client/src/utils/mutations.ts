import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        email
        username
        }
    }
    }
`
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}`

export const SAVE_BOOK = gql`
mutation SaveBook($bookId: String!, $title: String!, $authors: [String], $description: String!, $image: String, $link: String) {
  saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    username
    savedBooks {
      title
      image
      authors
    }
  }
}`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    username
    savedBooks {
      title
      image
      authors
      description
      bookId
    }
  }
}`



