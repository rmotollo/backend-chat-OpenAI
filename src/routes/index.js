import Router from "@koa/router";
import messages from "./mensagensRouter.js"
const router = new Router();


router.use(router.allowedMethods())
    .use(messages)

export default router;