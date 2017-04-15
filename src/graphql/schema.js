import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
    currentTime: {
      type: GraphQLString,
      args: {
        offset: {
          type: GraphQLInt,
        },
      },
      resolve(model, args) {
        console.log('currentTime resolve called');
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = new Date(Date.now() + args.offset).toJSON();
            console.log('currentTime returning', result);
            resolve(result);
          }, 2000);
        });
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
