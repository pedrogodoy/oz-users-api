//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const dataSource = require('./db/AppDataSource');
const usersController = require('./controllers/userController');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const swaggerUi = require('swagger-ui-koa');
const swagger = require('swagger2');
const { validate } = require('swagger2-koa');


const koa = new Koa();
const router = new Router();



//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

const document = swagger.loadDocumentSync('api.yaml');


router.get('/docs', swaggerUi.setup(document));

dataSource.initialize().then(() => {
  
}).catch((err) => {
  console.error("Error during Data Source initialization", err);});

koa
  .use(koaBody())
  .use(bodyParser())
  .use(router.routes())
  .use(usersController.routes())
  .use(usersController.allowedMethods())
  .use(koaStatic('node_modules/swagger-ui-dist'))


const server = koa.listen(PORT);

module.exports = server;