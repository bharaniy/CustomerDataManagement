let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
  firstName : String,
  lastName : String,
  cId : String,
  emailId: String,
  phoneNumber: String,
  locatedCity: String,
  dOb : String,
  gender: String,
  updatedDate: {type: Date, default: Date.now},
});
/**
 * @class Customer
 * @typeof Model<BookSchema>
 */
const Customer = mongoose.model('customers',BookSchema);
module.exports = Customer;
