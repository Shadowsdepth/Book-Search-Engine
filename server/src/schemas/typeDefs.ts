const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(bookId: String!, title: String!, authors: [String], description: String!, image: String, link: String): User
  }


`;

export default typeDefs;