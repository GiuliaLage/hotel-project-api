import user from '../models/user'

exports.index = async (req, res) => {
    const users = await user.find();
    return res.json(users);
}

exports.show = async (req, res) => {
    const { id } = req.params;
    const users = await user.findById(id)
        .catch(() => {
            res.status(401).json({ message: 'user does not exist!' })
        })

    return res.json(users);
}


exports.store = async (req, res) => {
    
    const { name, email, role } = req.body
    let users = await user.findOne({ email });
    
    if (!users) {
        users = await user.create({ name, email, role })
    }
    return res.json(users);
}

exports.update = async (req, res) => {

    const { name, email, role } = req.body
    const { id } = req.params

    const result = await user.findOneAndUpdate(id, { name: name, email: email, role: role })

    if (result) {
        return res.json({ status: true })
    }

    return res.json({ status: false })
}


exports.destroy = async (req, res) => {

    const { id } = req.params

    const result = await user.findById(id)

    if (result) {

        let deletedUser = await user.deleteOne({ _id: id })

        if (deletedUser) {
            return res.json({ message: 'user deleted!' });
        }
        else {
            return res.json({ message: 'something went wrong!' });
        }
    }
}