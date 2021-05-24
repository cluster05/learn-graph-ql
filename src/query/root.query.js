const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const { AuthorType, BookType } = require('./../schema/root.schema');
const { authors } = require('./../json/authers');
const { books } = require('./../json/books');


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

module.exports = { RootQueryType };