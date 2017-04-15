import { Meteor } from 'meteor/meteor';

import { Words } from '../imports/api/words.js';
import { UserWords } from '../imports/api/userWords.js';
import { Mode } from '../imports/api/mode.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Words.findOne( { estonian: item.estonian, french: item.french } );

      if ( !exists ) {
        Words.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  },
  
  addRemoveFromUserFavorite(current){
        var toto = UserWords.findOne({ word: current._id});
        
            if(!toto)
    {
        UserWords.insert({
          word: current._id,
          estonian: current.estonian
        });
        return "insert";
    }
    else
    {
        UserWords.remove({word: current._id});
        return "remove";
    } 

}
});
