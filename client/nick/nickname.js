Template.nickname.onCreated(function () {
    this.error = new ReactiveVar(false);
});

Template.nickname.helpers({
    error() {
        return Template.instance().error.get();
    }
});

Template.nickname.events({
    "click .go"(e, t) {
        var nickname =  t.$("input").val();
        
        Meteor.call("nickname", {
            gamePin: Session.get("gamePin"),
            nickname,
        }, (err, res) => {
            if (err) {
                console.log(err);
                t.error.set(err.reason);
                return;
            }
            
            Session.set("nickname", res);
            FlowRouter.go("/game");
        });
    },
});