Meteor.methods({
    "nickname"(opts) {
        let nickname = opts.nickname;
        let gamePin = opts.gamePin;
        
        let exists = !!Player.find({ nickname, gamePin }).count();
        
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
        let game = Game.findOne({ gamePin });
        let timeleft = moment.utc(game.deadline).diff(moment.utc(), "seconds");
        console.log("Answering", answer, "with", timeleft, "left");
        Player.update({
            gamePin,
            nickname   
        }, {
            $set: {
                answer,
                timeleft
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
        
        Player.update({ gamePin }, {
            $unset: { answer: 1, timeleft: 1 }
        });

        Game.update({ gamePin }, {
            $set: {
                timeout: false,
                started: true,
                active: true,
                deadline: moment.utc().add(20, "seconds").toDate()
            }
        });
    },
    
    "stop"(gamePin) {
        Game.update({ gamePin }, {
            $set: {
                timeout: true
            }
        });
    },
    
    "next"(gamePin) {
        console.log("Going next", gamePin);
        
        Player.update({ gamePin }, {
            $unset: { answer: 1, timeleft: 1 }
        });
        
        Game.update({ gamePin }, {
            $set: {
                timeout: false,
                started: true,
                active: true,
                deadline: moment.utc().add(20, "seconds").toDate()
            },
            
            $inc: {
                current: 1
            }
        });
    },
    
    "toScores"(gamePin) {
        let game = Game.findOne({ gamePin });
        let alternatives = game.questions[game.current].alternatives;
        
        _.each(alternatives, (alternative, i) => {
            if (alternative.correct) {
                console.log("is correct!");
                
                Player.find({ gamePin, answer: i }).forEach((player) => {
                    let points = Math.abs(player.timeleft) * 10;
                    console.log(player, "gets", points, "for", player.timeleft);
                    let nickname = player.nickname;
                    Player.update({ gamePin, nickname, answer: i }, {
                        $inc: { points }
                    });
                });
            }
        });
        
        
        Game.update({ gamePin }, {
            $set: {
                active: false,
            },
        });
    }
 });