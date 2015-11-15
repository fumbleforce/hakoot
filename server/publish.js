Meteor.publish("game", function (gamePin) {
    return Game.find({ gamePin, }, {
        
    });
});

Meteor.publish("players", function (gamePin) {
    return Player.find({ gamePin, }, {
        fields: {
            nickname: 1,
            gamePin: 1,
            points: 1
        }
    });
});