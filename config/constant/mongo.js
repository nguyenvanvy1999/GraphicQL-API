const mongoConfig = {
    host: 'mongodb://localhost:27017/GraphicQL',
    setting: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

module.exports = mongoConfig;