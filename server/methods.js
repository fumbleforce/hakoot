Meteor.methods({
    "nickname"(opts) {
        let nickname = opts.nickname;
        let gamePin = opts.gamePin;
        
        let exists = !!Player.find({ nickname }).count();
        
        if (exists) {
            throw new Meteor.Error("nickname_taken", "This nickname is taken!");
        }
        
        Player.insert({
            nickname,
            gamePin,
            points: 0,
            answer: 0
        });
        
        return nickname;
    },
    
    "join"(opts) {
        let gamePin = opts.gamePin;
        
        let exists = !!Game.find({ gamePin }).count();
        
        if (!exists) {
            throw new Meteor.Error("game_not_found", "No game with this pin!");
        }
        
        return gamePin;
    },
    
    "answer"(opts) {
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
    },
    
    "gamePinFromId"(id) {
        console.log("Id:", id);
        console.log("Game: ", Game.findOne(id));
        let game = Game.findOne(id);
        let pin = game.gamePin;
        console.log("pin", game.gamePin, pin);
        return pin;
    },
    
    "start"(gamePin) {
        console.log("Starting", gamePin);
        
        Game.update({ gamePin }, {
            $set: {
                started: true,
                active: true
            }
        })
    }
 });