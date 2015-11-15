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
        minCount: 4,
        maxCount: 4,
    }
})

Game.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title of the quiz"
    },
    gamePin: {
        type: String,
        autoform: { omit: true }
    },
    current: {
        type: Number,
        defaultValue: 0,
        autoform: { omit: true }
    },
    questions: {
        type: [QuestionSchema],
        minCount: 1,
    },
    started: {
        type: Boolean,
        defaultValue: false,
        autoform: { omit: true }
    },
    active: {
        type: Boolean,
        defaultValue: false,
        autoform: { omit: true }
    },
    timeout: {
        type: Boolean,
        defaultValue: false,
        autoform: { omit: true }
    },
    deadline: {
        type: Date,
        defaultValue: new Date(),
        autoform: { omit: true }
    }
}));

