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
        var pin =  t.$("input").val();
        
        if (pin === "") {
            t.error.set("Pin can't be empty!");
            return;
        }
        
        Meteor.call("join", {
            pin: pin,
            nickname: Session.get("nickname")
        }, (err, res) => {
            if (err) {
                console.log(err);
                t.error.set(err.reason);
                return;
            }
            
            Session.set("game", res);
            FlowRouter.go("/lobby");
        });
    },
});