import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import * as user from './user';

const dir = path.resolve();
const types = fileLoader(path.join(dir, './**/*.graphql'));
const typeDefs = mergeTypes(types, { all: true });

export default {
  resolvers: {
    Query: {
      ...user.getMyProfile,
    },
  },
  typeDefs,
};
