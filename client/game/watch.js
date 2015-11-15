Template.watch.onCreated(function () {
    this.gamePin = FlowRouter.current().params.gamePin;
    this.subscribe("game", this.gamePin);
    this.subscribe("players", this.gamePin);
});

Template.watch.onRendered(function () {

});

Template.watch.helpers({
    game() {
        return Game.findOne(Template.instance().gamePin);
    },
    
    players() {
        return Player.find({ gamePin: Template.instance().gamePin });
    },
    
    playerCount() {
        return  Player.find({ gamePin: Template.instance().gamePin }).count();
    },
    
    gamePin() {
        return Template.instance().gamePin;
    }
});

Template.watch.events({
    "click .start"(e, t) {
        Meteor.call("start", t.gamePin);
    },
});