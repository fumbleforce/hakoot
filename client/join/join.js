Template.join.onCreated(function () {
    this.error = new ReactiveVar(false);
})

Template.join.helpers({
    error() {
        return Template.instance().error.get();
    }
});

Template.join.events({
    "click .join-game"(e, t) {
        var gamePin =  t.$("input").val();
        
        if (gamePin === "") {
            t.error.set("gamePin can't be empty!");
            return;
        }
        
        Meteor.call("join", {
            gamePin: gamePin,
        }, (err, res) => {
            if (err) {
                console.log(err);
                t.error.set(err.reason);
                return;
            }
            console.log(err, res);
            Session.setPersistent("gamePin", res);
            FlowRouter.go("/nickname");
        });
    },
    
    "click .error-bar"(e, t) {
        t.error.set(false);
    }
});