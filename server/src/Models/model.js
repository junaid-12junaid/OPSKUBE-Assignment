const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the Seller collection
const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }
},{timestamps:true});

// Define schema for the Customer collection
const sellerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  phone: { type: String ,unique:true },
  password:{type: String}
},{timestamps:true});

// Define schema for the Book collection
const bookSchema = new Schema({
  name: { type: String, required: [true ,"Book name is required"]},
  author: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  // sellerId:{ type: Schema.Types.ObjectId, ref: 'Seller', required: true }
},{timestamps:true});

// Define schema for the Order collection
const orderSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  price: { type: Number, required: true },
  purchasedAt: { type: Date, required: true },
},{timestamps:true});

const SellerModel  = mongoose.model('Seller', sellerSchema);
const CustomerModel = mongoose.model('Customer', customerSchema);
const BookModel  = mongoose.model('Book', bookSchema);
const OrderModel  = mongoose.model('Order', orderSchema);

module.exports = {
    SellerModel,
  CustomerModel ,
  BookModel,
  OrderModel,
};
