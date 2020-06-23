import user from '../models/user'

class UserController {
  async index (req, res) {
    const users = await user.find()
    return res.json(users)
  }
  async show (req, res) {
    const { id } = req.params
    const users = await user.findById(id).catch(() => {
      res.status(401).json({ message: 'user does not exist!' })
    })

    return res.json(users)
  }
  async store (req, res) {
    const { name, email, role } = req.body
    let users = await user.findOne({ email })

    if (!users) {
      users = await user.create({ name, email, role })
    }
    return res.json(users)
  }
  async update (req, res) {
    const { name, email, role } = req.body
    const { id } = req.params

    const result = await user.findOneAndUpdate(id, {
      name: name,
      email: email,
      role: role
    })

    if (result) {
      return res.json({ status: true })
    }

    return res.json({ status: false })
  }
  
  async destroy (req, res) {
    const { id } = req.params

    const result = await user.findById(id)

    if (result) {
      let deletedUser = await user.deleteOne({ _id: id })

      if (deletedUser) {
        return res.json({ message: 'user deleted!' })
      } else {
        return res.json({ message: 'something went wrong!' })
      }
    }
  }
}

export default new UserController;