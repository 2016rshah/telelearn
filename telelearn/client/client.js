if (Meteor.isClient) {
	//Session.set("name", "TJ")
	var responseObject = {}
	Template.initial.events({
		'submit #form1': function (event) {
			event.preventDefault();
			responseObject.name = event.target.name.value;
			Session.set("name", event.target.name.value);
			responseObject.email = event.target.email.value;
			responseObject.timeSpent = event.target.time.value;
			responseObject.numClassesWithWork = event.target.numClassesWithWork.value;
			responseObject.numClasses = event.target.numClasses.value;
			responseObject.classes = new Array(parseInt(responseObject.numClassesWithWork));
			//console.log(responseObject);
			Responses.insert(responseObject);
			$("#initial").hide()
			$("#classNames").show()
		}
	});
	Template.classNames.helpers({
		//classes: Responses.findOne({name:Session.get("name")}).classes,
		//classes:[1, 2, 3, 4, 5, 6],
		classes:function(){
			if(Responses.findOne({name:Session.get("name")})){
				//console.log("success");
				return Responses.findOne({name:Session.get("name")}).classes
			}
			else{
				return [1, 2]
			}
		}, 
		name:Session.get('name')
	});
	Template.classNames.events({
		'submit #classNames': function (event) {
			event.preventDefault();
			console.log("submitted");
			var index = 0;
			var array = Responses.findOne({name:Session.get("name")}).classes
			$('.className').each(function(){
			    //this refers to each element
			    array[index] = this.value
			    this.value = array[index]
			    index++;
			});
			Meteor.call("insertClassNames", Session.get("name"), array, function(err, res){
				console.log(res)
				// id = Responses.findOne({name:Session.get("name")}).id
				// Responses.update({_id:id}, {$set: {classTimes:{}}})
				// for(var i = 0; i<array.length; i++){
				// 	//Responses.findOne({name:Session.get("name")}).classTimes[array[i]] = 0
				// 	//console.log(array[i])
				// 	Responses.update({_id:id}, {classTimes.array[i]:0})
				// }
			});
			//window.location.href = "/timeperclass"
			$("#classNames").hide()
			$("#timeperclass").show()
		}
	});	
	Template.timeperclass.helpers({
		classes: function(){
			if(Responses.findOne({name:Session.get("name")})){
				return Responses.findOne({name:Session.get("name")}).classes
			}
			else{
				return [1, 2]
			}
		}
	});
	Template.timeperclass.events({
		'submit form': function (event) {
			event.preventDefault();
			console.log("submitted");
			var index = 0;
			var array = Responses.findOne({name:Session.get("name")}).classes
			$('.classTime').each(function(){
			    //this refers to each element
			    array[index] = this.value
			    this.value = array[index]
			    index++;
			});
			Meteor.call("insertClassTimes", Session.get("name"), array, function(err, res){
				console.log(res)
				// id = Responses.findOne({name:Session.get("name")}).id
				// Responses.update({_id:id}, {$set: {classTimes:{}}})
				// for(var i = 0; i<array.length; i++){
				// 	//Responses.findOne({name:Session.get("name")}).classTimes[array[i]] = 0
				// 	//console.log(array[i])
				// 	Responses.update({_id:id}, {classTimes.array[i]:0})
				// }
			});		
			//window.location.href = "/success";
			$("#timeperclass").hide()
			$("#success").show()
		}
	});
	Template.admin.events({
		'click #delete': function () {
			Meteor.call("deleteEverything", function(error, result){console.log(Responses.find().fetch())})
		}
	});
	Template.success.helpers({
		profile: function () {
			return Responses.findOne({name:Session.get("name")})
		}
	});
	Template.details.helpers({
		name: function () {
			return Session.get("name")
		}
	});
}