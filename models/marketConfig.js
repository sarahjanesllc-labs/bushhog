// vendor model
var Mongoose = require('mongoose');

var marketConfigSchema = new Mongoose.Schema({
    marketName: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    logoImage: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    facebookID: {
        type: String,
        trim: true
    },
    twitterID: {
        type: String,
        trim: true
    },
    pintrestID: {
        type: String,
        trim: true
    },
    linkedinID: {
        type: String,
        trim: true
    },
    summerSeasonStart: {
        type: Date,
        default: Date.now
    },
    summerSeasonStop: {
        type: Date,
        default: Date.now
    },
    winterSeasonStart: {
        type: Date,
        default: Date.now
    },
    winterSeasonStop: {
        type: Date,
        default: Date.now
    },
    annualFee: {
        type: Number
    },
    monthlyFee: {
        type: Number
    },
    dailyFee: {
        type: Number
    },
    paypalClientKey: {
        type: String
    },
    paypalClientSecret: {
        type: String
    },
    paypalRefreshToken: {
        type: String
    },
    // current market year
    marketYear: {
        type: Date,
        default: Date.now
    }
});

var marketConfig = Mongoose.model('marketConfig', marketConfigSchema);

module.exports = {
    MarketConfig: marketConfig
};
