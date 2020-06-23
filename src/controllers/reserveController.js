import Reserve from '../models/reserve';
import Hotel from '../models/hotel';
import User from '../models/User';


class ReserveController {
    async index(req,res){
        const {id_hotel} = req.params;
        let reserves = await Reserve.find({hotel: id_hotel}).catch(error =>{
            return res.status(400).json({mensagem: 'invalid request'});
        })
        return res.json(reserves)
    }
    async show(req,res){
        const {id_hotel,id} = req.params;
        let reserve = await Reserve.findOne({_id: id, hotel:id_hotel}).catch(error =>{
            return res.status(400).json({mensagem: 'invalid request'})
        })
        await reserve.populate('user').populate('hotel').execPopulate();
        return res.json(reserve)
    }
    async store(req, res) {
        const {user_id} = req.headers; 
        const {hotel_id} = req.params;
        const {startDate, endDate, totalHost} = req.body;

        let hotel = await Hotel.findById(hotel_id).catch(error => {
            return res.status(400).json({message: 'invalid request'});
        });
        let user = await User.findById(user_id).catch(error =>{
            return res.status(400).json({message: 'invalid request'});    
        })
        if(!hotel || user){
            return res.status(400).json({message: 'invalid request'});
        }
        let reserve = await Reserve.create({
            user: user_id,
            hotel: hotel_id,
            startDate: startDate,
            endDate: endDate,
            totalHost: totalHost
        });
        await reserve.populate('user').populate('hotel').execPopulate();
         return res.json(reserve);
        
    }

    async update(req, res){
        
        const {reserve_id} = req.params;
        const {hotel_id} = req.params;
        const {user_id, startDate, endDate,total_hosts} = req.body;
        
        let hotel = await Hotel.findById(hotel_id).catch(error => {
            return res.status(400).json({message: 'invalid request'});
        });
        let user = await User.findById(user_id).catch(error =>{
            return res.status(400).json({message: 'invalid request'});    
        })
        if(!hotel || user){
            return res.status(400).json({message: 'invalid request'});
        }
        
        const result = await user.findOneAndUpdate(reserve_id, {
            user: user_id,
            hotel: hotel_id,
            startDate: startDate,
            endDate: endDate,
            totalHost: total_hosts
          }) 

          if(!result){
            return res.status(400).json({mensagem: 'invalid request'})
          }
          else{
            await result.populate('user').populate('hotel').execPopulate();
            return  res.json(result);
          }
    }
    async destroy(req, res){
        const { reserve_id } = req.params
        const {hotel_id} = req.params;
        
         await Hotel.findById(hotel_id).catch(error => {
            return res.status(400).json({message: 'invalid request'});
        });

        const result = await Reserve.findById(reserve_id)

        if (result) {
          let reserve = await Reserve.deleteOne({ _id: reserve_id })
    
          if (reserve) {
            return res.json({message: 'reserve successfully deleted.'})
          } else {
            return res.status(400).json({mensagem: 'invalid request'})
          }
        }
    }
}

export default new ReserveController;