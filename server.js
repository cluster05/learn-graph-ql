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
        name: 'helloworld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello World'
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
