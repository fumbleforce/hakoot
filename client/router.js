

FlowRouter.route('/', {
    action(params, queryParams) {
        
        Session.set("gamePin", false);
        Session.set("nickname", false);
        
        FlowRouter.go("/join");
    }
});

FlowRouter.route("/nickname", {
    action(params) {
        if (!Session.get("gamePin")) {
            FlowRouter.go("/join");
        } else {
            BlazeLayout.render("layout", { content: "nickname" });
        }
    }
});

FlowRouter.route("/join", {
    action(params) {
        if (Session.get("gamePin")) {
            FlowRouter.go("/nickname");
        } else {
            BlazeLayout.render("layout", { content: "join" });
        }
    }
});

FlowRouter.route("/game", {
    action(params) {
        if (!Session.get("gamePin")) {
            FlowRouter.go("/join");
        } else if (!Session.get("nickname")) {
            FlowRouter.go("/nickname");
        } else {
            BlazeLayout.render("layout", { content: "game" });
        }
    }
});

FlowRouter.route("/create", {
    action(params) {
        BlazeLayout.render("layout", { content: "create" });
    }
});

FlowRouter.route("/watch/:gamePin", {
    action(params) {
        BlazeLayout.render("layout", { content: "watch" });
    }
});
