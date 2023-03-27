
import Router from "@koa/router"
import MessageController from "../controllers/messagesController.js";
const router = new Router();

router
    .post('/message', MessageController.passPrompt)
    .get('/lastmessage/:id', MessageController.buscaMensagemPorId)

export default router;