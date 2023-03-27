import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import db from './config/dbConnect.js';
import router from "./routes/mensagensRouter.js"

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log('conexão feita com sucesso')
});

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.allowedMethods())
app.use(router.routes());


export default app;