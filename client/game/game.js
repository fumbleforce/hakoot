Template.game.onCreated(function () {
    this.gamePin = Session.get("gamePin");
    let gameSub = Meteor.subscribe("game", this.gamePin);
    
    let playerSub = Meteor.subscribe("player", {
        gamePin: this.gamePin,
        nickname: Session.get("nickname")
    });
    
    Session.set("gameLoaded", false);
    Session.set("playerLoaded", false);
    console.log(gameSub, playerSub);
    
    this.autorun(() => {
        console.log(gameSub.ready());
        Session.set("gameLoaded", gameSub.ready());
        Session.set("playerLoaded", playerSub.ready());
    });
});

Template.game.onRendered(function () {

});

Template.game.helpers({
    active() {
        if (!Session.get("gameLoaded")) return;
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        if (game) {
            return game.active;
        }
    },
    result() {
        if (!Session.get("gameLoaded")) return;
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        if (game) {
            return !game.active && game.current > 0;
        }
    },
    
});


Template.activeGame.helpers({
    hasChosen() {
        if (!Session.get("playerLoaded")) return;
        
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        
        if (player) {
            return player.answer != undefined;
        }
    },
    
    answer() {
        if (!Session.get("playerLoaded")) return;
        
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        
        if (player) {
            return player.answer;
        }
    },
    
    timeout() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.timeout;
    },
    
    correct() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        if (player && player.answer == undefined) return false;
        let alternatives = game.questions[game.current].alternatives;
        return alternatives[player.answer].correct;
    },
    
    
    alternatives() {
        if (!Session.get("gameLoaded")) return;
        
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        if (game) {
            return game.questions[game.current].alternatives;
        }
    },
    
    getIcon(i) {
        return [
            "circle",
            "asterisk",
            "square",
            "remove"
        ][i];
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
        console.log(answer);
        Meteor.call("answer", {
            gamePin: Session.get("gamePin"),
            nickname: Session.get("nickname"),
            answer
        });
    },
});



Template.result.helpers({
    correct() {
        if (!Session.get("playerLoaded")) return;
        if (!Session.get("gameLoaded")) return;
        
        let player = Player.findOne({
            nickname: Session.get("nickname"),
            gamePin: Session.get("gamePin")
        });
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        
        if (player && game) {
            return game.questions[game.current].alternatives[player.answer].correct;
        }
    }
});
