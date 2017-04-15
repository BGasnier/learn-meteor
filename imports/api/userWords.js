

import { Mongo } from 'meteor/mongo';

 if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('userwords', function userWordsPublication() {

    return UserWords.find();

  });

}

export const UserWords = new Mongo.Collection('userwords');

