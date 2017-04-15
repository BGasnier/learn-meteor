

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../api/words.js';
import { UserWords } from '../api/userWords.js';
import { Mode } from '../api/mode.js';



var learnMode = false;

import './body.html';

 Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();

  Meteor.subscribe('words');
    Meteor.subscribe('mode');

});
 
 Template.body.events({
    
          'click .learn-button'(event) { //keyup could be used to check on every character

    // Prevent default browser form submit


    event.preventDefault();
    learnMode = !learnMode;

    if(learnMode)
    {
        Words.find().forEach(function(word)     {
                    Words.update(word._id, { $set: { hint: word.french } });
        });
    }
    else
    {
                Words.find().forEach(function(word)     {
                    Words.update(word._id, { $set: { hint: null } });
        });
    }
    
    
          },
    
      'click .restart-button'(event) { //keyup could be used to check on every character

    // Prevent default browser form submit


    event.preventDefault();
    Words.find().forEach(function(word)     {
                Words.update(word._id, { $set: { correct: null, trial: null }, });
    });
  
    
          },
          
                'click .favorite-button'(event) { //keyup could be used to check on every character

    // Prevent default browser form submit


    event.preventDefault();

    //var exist = UserWords.findOne({ word: this._id}).count();
    var toto= Meteor.call( 'addRemoveFromUserFavorite', this, ( error, response ) => {
         if (error)
         {
    console.log(error);
         }
    else
    {
         console.log(response);
    }
    });

          },

  'submit .word-guess'(event) { //keyup could be used to check on every character

    // Prevent default browser form submit

    event.preventDefault();
    
    
    // Get value from form element

    const target = event.target;

    const text = target.text.value; //if keyup, use target.value directly
    
    var Omega = '\u00D5';
    
            var mtrial = 1;
      if(!!this.trial)
      {
        mtrial = this.trial+1;
      }
    
    if(text == this.french)
    {
        Words.update(this._id, {

      $set: { correct: true, trial: mtrial },

        });
    }
    else
    {

      Words.update(this._id, {

      $set: { correct: false, trial: mtrial },

        });
    }
    
 
/*
 

    // Insert a task into the collection

    Tasks.insert({

      text,

      createdAt: new Date(), // current time

    });

 

    // Clear form

    target.text.value = '';*/

  },

});

Template.body.helpers({

  words() {

    return Words.find();

  },

});

Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {
    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, 'warning' );
          } else {
            // Handle success here.
            alert("toto");
          }
        });
      }
    });
  }
});

