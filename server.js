const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
    // getting of data
    query: new GraphQLObjectType({
        // query name 
        name: 'helloworld',
        // data to return 
        fields: () => ({
            message: {
                // type of return type data
                type: GraphQLString,
                // what gonna return have two dafault parameter 1 parent 2 arguments 
                resolve: (parent, args) => 'Hello World'
            }
        })

    })
})


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(3000, () => {
    console.log(`listing on port 3000`)
})
