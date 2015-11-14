Meteor.methods({
    "nickname": function (opts) {
        let nickname = opts.nickname;
        let gamePin = opts.gamePin;
        
        let exists = !!Player.find({ nickname }).count();
        
        if (exists) {
            throw new Meteor.Error("nickname_taken", "This nickname is taken!");
        }
        
        Player.insert({
            nick,
            gamePin,
            points: 0,
            answer: 0
        });
    },
    
    "join": function (opts) {
        let gamePin = opts.gamePin;
        
        let exists = !!Game.find({ gamePin }).count();
        
        if (!exists) {
            throw new Meteor.Error("game_not_found", "No game with this pin!");
        }
        
        return gamePin;
    },
    
    "answer": function (opts) {
        let gamePin = opts.gamePin;
        let nickname = opts.nickname;
        let answer = +opts.answer;
        
        Player.update({
            gamePin,
            nickname    
        }, {
            $set: {
                answer,
            }
        });
    }
 });