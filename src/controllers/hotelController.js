import Hotel from '../models/hotel'

class HotelController {
  async index (req, res) {
    const { uf, city } = req.body
    let hotels = await Hotel.find({ uf, city })
    return res.json(hotels)
  }
  async show (req, res) {
    const { id } = req.params
    let hotel = await Hotel.findById(id).catch(error => {
      return res.status(400).json({ mensagem: 'invalid request' })
    })
    return res.json(hotel)
  }
  async store (req, res) {
    const { name, uf, city, address, totalRooms, hotelHate } = req.body
    let hotel = await Hotel.findOne({ name })
    if (!hotel) {
      hotel = await Hotel.create({
        name,
        uf,
        city,
        address,
        totalRooms,
        hotelHate
      })
    } else {
      return res.status(400).json({ mensagem: 'hotel name not available' })
    }
    return res.json(hotel)
  }

  async update (req, res) {
    const { id, name, uf, city, address, totalRooms, hotelHate } = req.body
    let hotel = await Hotel.findById(id).catch(error => {
      return status(400).json({ mensagem: 'invalid request' })
    })
    hotel = await Hotel.update(
      { _id: id },
      { name, uf, city, address, totalRooms, hotelHate }
    )
    return res.json({ mesagem: 'successfully updated' })
  }

  async destroy (req, res) {
    const { id } = req.body
    let hotel = await Hotel.findById(id).catch(error => {
      return res.status(400).json({ mensagem: 'invalid request' })
    })
    await Hotel.deleteOne({ _id: id })
    return res.json({ mensagem: 'successfully deleted' })
  }
}

export default new HotelController()
