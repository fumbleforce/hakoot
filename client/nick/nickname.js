Template.nickname.onCreated(function () {
    this.errors = new ReactiveDict();
});

Template.nickname.helpers({
    errors(err) {
        return Template.instance().errors.get(err);
    }
});

Template.nickname.events({
    "click .go"(e, t) {
        var nickname =  t.$("input").val();
        
        Meteor.call("nickname", {
            nickname,
        }, (err, res) => {
            if (err) {
                console.log(err);
                t.errors.set(err.error, err.reason);
                return;
            }
            
            Session.set("game", res);
            FlowRouter.go("/join");
        });
    },
});