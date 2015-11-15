AutoForm.addHooks("gameForm", {
    after: {
        insert: function () {
            Meteor.call("gamePinFromId", this.docId, function (err, pin) {
                FlowRouter.go(`/watch/${pin}`);
            });
        }
    }
});