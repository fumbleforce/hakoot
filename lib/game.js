Game = new Mongo.Collection("game");

AlternativeSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Alternative text"
    },
    correct: {
        type: Boolean,
        label: "Is this alternative correct?"
    }
})

QuestionSchema = new SimpleSchema({
    question: {
        type: String,
        label: "Question",
    },
    alternatives: {
        type: [AlternativeSchema],
        // Should be exactly 4
    }
})

Game.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title of the quiz"
    },
    gamePin: {
        type: String,
        autoValue: () => 0,
        autoform: { omit: true }
    },
    current: {
        type: Number,
        autoValue: () => 0,
        autoform: { omit: true }
    },
    questions: {
        type: [QuestionSchema],
    }
}));

