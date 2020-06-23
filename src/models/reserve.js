import {Schema, model} from 'mongoose'; 

const ReservaSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    hotel: {type: Schema.Types.ObjectId, ref: 'Hotel'},
    startDate: String,
    endDate: String,
    totalHost: Number

})

export default model('Reserve', ReservaSchema);

