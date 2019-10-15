// packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/acme";
const port = process.env.PORT || 8000
const Product = require('./schemas/product.js')
const fixWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
const path = require('path')


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

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/cadastro-produto.html'))
})


const apiRouter = express.Router()

apiRouter.use((req, res, next) => {
    console.log('Foi feira uma requisição para nsosa API!')
    next()
})

apiRouter.route('/products')
    .post((req, res) => {
        var product = new Product()

        console.log(req)
        product.code = req.body.code
        product.name = req.body.name
        product.price = req.body.price
        product.sizes = req.body.sizes
        product.colors = req.body.colors

        console.log(product)
        product.save((err) => {
            if (err) {
                //usuario duplicado
                if (err.code === 11000) {
                    console.log('já existe')
                    return res.json({
                        success: false,
                        message: 'Um produto com esse código já existe'

                    })
                } else {
                    console.log('erro')
                    return res.send(err)
                }
            }
            console.log('criado')
            res.json({
                message: 'Produto criado'
            })
        })
    })
    .get((req, res) => {
        Product.find({}, (err, product) => {
            if (err) res.send(err)
            res.json(product)
        })
    })
apiRouter.route('/products/:code')
    .get((req, res) => {
        Product.find({
            code: req.params.code
        }, (err, product) => {
            if (err) res.send(err)
            res.json(product)
        })
    })
    .put((req, res) => {
        Product.find({
            code: req.params.code
        }, (err, product) => {
            if (err) res.send(err)

            if (req.body.name) product.name = req.body.name
            if (req.body.productname) product.productname = req.body.productname
            if (req.body.password) product.password = req.body.password

            Product.save((err) => {
                if (err) res.send(err)

                res.json({
                    message: 'Usuário atualizado!'
                })
            })
        })
    })
    .delete((req, res) => {
        Product.remove({
            code: req.params.code
        }, (err, product) => {
            if (err) return res.send(err)
            res.json({
                message: 'Apagado com sucesso!'
            })
        })
    })

app.use('/api', apiRouter)

app.listen(port)
console.log('A porta mágica é ' + port)