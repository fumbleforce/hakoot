
Template.lobby.helpers({
    game() {
        return Game.findOne(FlowRouter.current().params.gamePin);
    },
    
    players() {
        return Player.find({ gamePin: FlowRouter.current().params.gamePin });
    },
    
    playerCount() {
        return  Player.find({ gamePin: FlowRouter.current().params.gamePin }).count();
    },
    
    gamePin() {
        return FlowRouter.current().params.gamePin;
    }
});


Template.lobby.events({
    "click .start"(e, t) {
        Meteor.call("start", FlowRouter.current().params.gamePin);
    },
});