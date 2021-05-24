const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const { AuthorType, BookType } = require('./../schema/root.schema');

const { authors } = require('./../json/authers');
const { books } = require('./../json/books');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add Book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (prarent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
                books.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add Auther',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (prarent, args) => {
                const author = { id: authors.length + 1, name: args.name }
                authors.push(author);
                return author;
            }
        },
    })
})

module.exports = { RootMutationType };