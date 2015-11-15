Template.registerHelper("session", function (key) {
    return Session.get(key);
});

Template.registerHelper("addIndex", function (arr) {
    return _.map(arr, (value, index) => {
        return { index, value }
    });
});