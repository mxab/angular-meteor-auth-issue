
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Bananas = new Mongo.Collection('Bananas');
Meteor.startup(() => {
  if(!Meteor.users.find().count()){
    console.log('creating test user')
    Accounts.createUser({
      username : "test",
      password : "test"
    })

    for(var i=0;i<1000;i++){
      Bananas.insert({
        color : Math.random()>0.5?"yellow": "green"
      }, function(){

      })
    }
  }
});


Meteor.publish(null,function(){
  return Meteor.users.find({
    _id : this.userId
  });
})

Meteor.publish(null,function(){
  return Bananas.find({color: "yellow"});
})
