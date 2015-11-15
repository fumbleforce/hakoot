Meteor.publish("game", function (gamePin) {
    return Game.find({ gamePin, }, {
        
    });
});

Meteor.publish("players", function (gamePin) {
    return Player.find({ gamePin, }, {
        fields: {
            nickname: 1,
            gamePin: 1,
            points: 1,
            answer: 1,
        }
    });
});

Meteor.publish("player", function (opts) {
    return Player.find(opts, {
        fields: {
            nickname: 1,
            gamePin: 1,
            points: 1,
            answer: 1
        }
    });
});