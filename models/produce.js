// produce model
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var produceSchema = new Schema({
    category : { type: String, required: true, trim: true },
    label : { type: String, required: true, trim : true },
    uom : { type: String, required: true, trim: true },      // unit of measure
    price : { type: Number, required: true, trim : true },
    created: { type: Date, required: true, default: Date.now }
});

var produce = Mongoose.model('produce', produceSchema);

module.exports = {
    Produce: produce
};
