import { Router } from 'express'
import HotelController from './controllers/hotelController'
import UserController from './controllers/userController'
import ReserveController from './controllers/reserveController';

const router = Router()

router.get('/', (req, res) => {
  return res.json({ resposta: true })
})

router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.destroy)

router.get('/hotels', HotelController.index)
router.get('/hotels/:id', HotelController.show)
router.post('/hotels', HotelController.store)
router.put('/hotels', HotelController.update)
router.delete('/hotels', HotelController.destroy)

router.get('/hotels/:hotel_id/reserve', ReserveController.index)
router.get('/hotels/:hotel_id/reserve/:id', ReserveController.show)
router.post('/hotels/:hotel_id/reserve', ReserveController.store)
router.put('/hotels/:hotel_id/reserve/:reserve_id', ReserveController.update)
router.delete('/hotels/:hotel_id/reserve/:reserve_id', ReserveController.destroy)



export default router
