

import { Mongo } from 'meteor/mongo';

 if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('words', function wordsPublication() {

    return Words.find();

  });

}

export const Words = new Mongo.Collection('words');

