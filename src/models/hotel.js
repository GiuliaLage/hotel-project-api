import { Schema, model } from 'mongoose'

const HotelSchema = new Schema({
  name: String,
  uf: String,
  city: String,
  totalRooms: Number,
  hotelHate: Number
});

export default model('Hotel', HotelSchema);


