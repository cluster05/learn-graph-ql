const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { RootMutationType } = require('./src/query/mutation.quey')
const { RootQueryType } = require('./src/query/root.query')

const app = express();

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

const PORT = 3000;

app.listen(3000, () => {
    console.log(`App Started on PORT NO : ${PORT}`)
})
