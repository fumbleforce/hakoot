Template.layout.onCreated(function () {

});

Template.layout.onDestroyed(function () {

});

Template.layout.onRendered(function () {
    const colors = [
        "#1dd2af",
        "#f1c40f",
        "#3498db",
        "#e67e22",
        "#3498db",
        "#9b59b6",
    ];
    
    let current = 0;
    
    function setColor() {
        $("body").css("background-color", colors[current]);
    }
    
    Meteor.setInterval(() => {
        if (current === colors.length -1) {
            current = 0;
        } else {
            current++;
        }

        setColor();
    }, 6000);
    
    
});

Template.layout.helpers({

});

Template.layout.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});