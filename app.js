const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const multer = require('multer')
const sequelize = require('./util/database')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

//Model importing
const Unidade = require('./model/unidade')
const Tema = require('./model/tema')
const Subtema = require('./model/subtema')
const User = require('./model/user')

//Route importing
const indexRouter = require('./routes/index')
const mgmtController = require('./routes/management')
const authController = require('./routes/auth')

const app = express()

//Configuration for multer (image uploading)
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/imgs/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('imagem'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

var myStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 5 * 60 * 1000,
    expiration: 15 * 60 * 1000
})
app.use(
    session({
        secret: 'my secret',
        store: myStore,
        resave: false,
        saveUninitialized: false
    })
)

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn
    next()
})

app.use(flash())

//Routes mapping
app.use(indexRouter)
app.use(mgmtController)
app.use(authController)

//app.use(errorController.get404)

//Associations

Tema.belongsTo(Unidade, {foreignKey: { name: 'unidade_id' }})
Subtema.belongsTo(Tema, {foreignKey: { name: 'tema_id' }})

sequelize
    .sync({/* force: true */})
    .then(farm => {
        User.findAll()
        .then(user => {
            if(user.length == 0){
                User.create({
                    username: 'admin',
                    password: '$2a$12$Iec4KV9FUj6JNtels/HwE.ThfdNjgZasrk8vykUZ0UjEjvTveys1u',
                    is_admin: 1
                })
            }
            app.listen(3000);
        })
    })
    .catch(err => {
        console.log(err);
    });