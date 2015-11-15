Template.game.onCreated(function () {
    this.gamePin = Session.get("gamePin");
    this.subscribe("game", this.gamePin);
    this.subscribe("player", {
        gamePin: this.gamePin,
        nickname: Session.get("nickname")
    });
});

Template.game.onRendered(function () {

});

Template.game.helpers({
    active() {
        let game = Game.findOne(Template.instance().gamePin);
        if (game) {
            return game.active;
        }
    },
    result() {
        let game = Game.findOne(Template.instance().gamePin);
        if (game) {
            return !game.active && game.current > 0;
        }
    },
    
});


Template.activeGame.onCreated(function () {

});

Template.activeGame.onRendered(function () {

});

Template.activeGame.helpers({
    hasChosen() {
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        
        if (player) {
            return player.answer != undefined;
        }
    },
    
    answer() {
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        
        if (player) {
            return player.answer;
        }
    },
    
    alternativeClass(i) {
        return [
            "blue",
            "red",
            "yellow",
            "green"
        ][i];
    }
});

Template.activeGame.events({
    "click [choose]"(e) {
        var answer = e.currentTarget.getAttribute("choose");
        Meteor.call("answer", {
            gamePin: Session.get("gamePin"),
            nickname: Session.get("nickname"),
            answer
        });
    },
});



Template.result.helpers({
    correct() {
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        let game = Game.findOne(Session.get("gamePin"));
        
        if (player && game) {
            return game.questions[game.current].alternatives[player.answer].correct;
        }
    }
});
