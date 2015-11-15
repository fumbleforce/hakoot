AutoForm.addHooks("gameForm", {
    before: {
        insert: function (doc) {
            console.log("Befpre insert: ", doc);
            doc.gamePin = "" + (Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000);
            doc.current = 0;
            console.log("Befpre insert: ", doc);
            return doc;
        }
    },

    onSuccess(formType, result) {
        console.log(formType, result);
        Meteor.call("gamePinFromId", result, function (err, gamePin) {
            console.log("Got pin", gamePin);
            FlowRouter.go(`/watch/${gamePin}`);
        });
    },
    
    onError: function(formType, error) {
        console.log(error);
    },
});