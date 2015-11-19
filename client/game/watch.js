Template.watch.onCreated(function () {
    let template = this;
    
    this.gamePin = FlowRouter.current().params.gamePin;
    Session.set("gamePin", this.gamePin);
    this.subscribe("game", this.gamePin);
    this.subscribe("players", this.gamePin);
    
    //var audio;
    //audio = template.find('#audio');
    //Session.set('musicDuration', audio.duration);
    //audio.play();
});

Template.watch.helpers({
    started() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.started;
    },
    
    active() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.active;
    },
});


Template.question.onCreated(function () {
    let game = Game.findOne({ gamePin: FlowRouter.current().params.gamePin });

    this.countdown = new ReactiveCountdown(moment.utc(game.deadline).diff(moment.utc(), "seconds"));
    
    this.rendered = new ReactiveVar(false);
    
    this.countdown.start(function() {
        Meteor.call("stop", Session.get("gamePin"));
    });

});

Template.question.onRendered(function () {
    this.rendered.set(true);
});

Template.question.helpers({
    question() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.questions[game.current].question;
    },
    
    timeout() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.timeout;
    },
    
    current() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.current + 1;
    },
    
    getCountdown() {
        return Template.instance().countdown.get();
    },
    
    alternatives() {
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        return game && game.questions[game.current].alternatives;
    },
    
    answerCount() {
        return Player.find({
            gamePin: Session.get("gamePin"),
            answer: { $exists: true }
        }).count();
    },
    
    pillar(i) {
        if (!Template.instance().rendered.get()) return;
        
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        let alternative = game.questions[game.current].alternatives[i];
        let playerTotal = Player.find({
            gamePin: Session.get("gamePin"),
            answer: { $exists: true }
        }).count();
        let playerAnswer = Player.find({
            gamePin: Session.get("gamePin"),
            answer: i
        }).count();
        let height = ~~((playerAnswer / playerTotal) * 90);
        let color = [
            "#2185d0",
            "#db2828",
            "#fbbd08",
            "#21ba45"
        ][i];
        
        console.log(i, ($("#answers").width() / 8),  ($("#answers").width() / 8) * i, (i+1) * ($("#answers").width() / 8));
        
        let left = ($("#answers").width() / 8) * i + (i+1) * ($("#answers").width() / 8);
        
        return `height: ${height}%; background-color: ${color}; left: ${left}px;`;
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
        let game = Game.findOne({ gamePin: Session.get("gamePin") });
        let alternative = game.questions[game.current].alternatives[i];
        
        if (game.timeout) {
            if (!alternative.correct) {
                return "tertiary gray";
            }
        }
        
        return [
            "blue",
            "red",
            "yellow",
            "green"
        ][i];
    }
});


Template.question.events({
    "click .scores"(e, t) {
        Meteor.call("toScores", Session.get("gamePin"));
    },
    
});


Template.score.helpers({
    rankedPlayers() {
        return Player.find({ gamePin: Session.get("gamePin") }, {
            sort: { points: -1 }
        });
    },
    
    playerCount() {
        return  Player.find({ gamePin: FlowRouter.current().params.gamePin }).count();
    },
    
    canGoNext() {
        let game = Game.findOne({ gamePin: FlowRouter.current().params.gamePin });
        return game && game.current < game.questions.length -1;
    }
});


Template.score.events({
    "click .next"(e) {
        Meteor.call("next", FlowRouter.current().params.gamePin);
    },
});
