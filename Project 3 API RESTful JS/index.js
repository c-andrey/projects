// packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/acme";
const port = process.env.PORT || 8000
const User = require('./domain/user.js')
const fixWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}


mongoose.connect(url, fixWarning, (err, mongodb) => {
    if (err) {
        throw err
    };

})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
    next()
})

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Bem-vindo à home page!')
})

const apiRouter = express.Router()

apiRouter.use((req, res, next) => {
    console.log('Foi feira uma requisição para nsosa API!')
    next()
})

apiRouter.route('/users')
    .post((req, res) => {
        var user = new User()

        user.name = req.body.name
        user.username = req.body.username
        user.password = req.body.password

        user.save((err) => {
            if (err) {
                //usuario duplicado
                if (err.code === 11000) {
                    console.log('já existe')
                    return res.json({
                        success: false,
                        message: 'Um usuário com esse username já existe.'

                    })
                } else {
                    console.log('asd')
                    return res.send(err)

                }
            }
            console.log('criado')
            res.json({
                message: 'Usuário criado!'
            })
        })
    })
    .get((req, res) => {
        User.find((err, user) => {
            if (err) res.send(err)
            res.json(user)
        })
    })


apiRouter.route('/users/:id')
    .get((req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) res.send(err)
            res.json(user)
        })
    })
    .put((req, res) => {
        user.findById(req.params.id, (err, user) => {
            if (err) res.send(err)

            if (req.body.name) user.name = req.body.name
            if (req.body.username) user.username = req.body.username
            if (req.body.password) user.password = req.body.password

            user.save((err) => {
                if (err) res.send(err)

                res.json({
                    message: 'Usuário atualizado!'
                })
            })
        })
    })
    .delete((req, res) => {
        User.remove({
            _id: req.params.id
        }, (err, user) => {
            if (err) return res.send(err)
            res.json({
                message: 'Apagado com sucesso!'
            })
        })
    })

app.use('/api', apiRouter)

app.listen(port)
console.log('A porta mágica é ' + port)