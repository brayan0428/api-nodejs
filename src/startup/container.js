const {createContainer,asClass,asValue,asFunction} = require('awilix')
const config = require('../config')
const app = require('./index')

//Services
const {HomeService,UserService,IdeaService,CommentService} = require('../services')

//Controllers
const {HomeController} = require('../controllers')
const container = createContainer()

//Routes
const { HomeRoutes } = require('../routes/index.routes')
const Routes = require('../routes')

//Models
const {User,Comment,Idea} = require("../models")

//Repositories
const {UserRepository,CommentRepository,IdeaRepository} = require('../repositories')
container
.register({
    app: asClass(app).singleton(),
    router:asFunction(Routes).singleton(),
    config: asValue(config)
})
.register({
    HomeService:asClass(HomeService).singleton(),
    UserService:asClass(UserService).singleton(),
    CommentService:asClass(CommentService).singleton(),
    IdeaService:asClass(IdeaService).singleton()
})
.register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
})
.register({
    HomeRoutes : asFunction(HomeRoutes).singleton()
})
.register({
    User:asValue(User),
    Idea:asValue(Idea),
    Comment:asValue(Comment)
})
.register({
    UserRepository:asClass(UserRepository).singleton(),
    IdeaRepository:asClass(IdeaRepository).singleton(),
    CommentRepository:asClass(CommentRepository).singleton()
})

module.exports = container