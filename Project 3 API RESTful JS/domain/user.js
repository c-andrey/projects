const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        require: true,
        select: false
    }
})

// gerar o hash do password antes de salvar
UserSchema.pre('save', (next) => {
    const user = this

    //gerar  o hash a´penas se o password mudou o para um novo usuario
    if (!user.isModified('password')) {
        return next()
    }

    // gerando o hash
    const hash = bcrypt.hashSync(user.password)

    user.password = hash
    nex()
})

//metodo para comparar um password dado com a database hash
UserSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password)
}
module.exports = mongoose.model('User', UserSchema)