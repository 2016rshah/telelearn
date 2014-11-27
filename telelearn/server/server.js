
if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
    Meteor.methods({
    	deleteEverything: function(){
    		// array = Responses.find().fetch()
    		// for(i = 0; i<array.length; i++){
    		// 	id = array[i]._id
    		// 	Responses.remov
    		// }
    		Responses.remove({});
    	}, 
    	insertClassNames: function(username, array){
    		Responses.update({name:username}, {$set: {classes:array}})
    		return Responses.findOne({name:username}).classes
    	}, 
    	insertClassTimes: function(username, array){
    		Responses.upsert({name:username}, {$set: {classTimes:array}})
    		return Responses.findOne({name:username}).classTimes
    	}
    })
}
