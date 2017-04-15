

import { Mongo } from 'meteor/mongo';

 if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('mode', function modePublication() {

    return Mode.find();

  });

}

export const Mode = new Mongo.Collection('mode');

