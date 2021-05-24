const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const app = express();



const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'The Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 }
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'this represent author of book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => author.id === book.authorId)
            }
        }

    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'this represent the Books .',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'Get single book by id',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: GraphQLList(BookType),
            description: 'list of books',
            resolve: () => books
        },
        author: {
            type: AuthorType,
            description: 'get single book by id',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(auther => auther.id === args.id)
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'list of authors',
            resolve: () => authors
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(3000, () => {
    console.log(`listing on port 3000`)
})
