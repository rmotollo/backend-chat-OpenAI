import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import createPrePrompt from "./src/services/promptManager.js";
import db from './src/config/dbConnect.js';
dotenv.config();


db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log('conexão feita com sucesso')
});

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 4000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router
    .post('/message', async (ctx) => {
        const { message } = ctx.request.body;
        const newMessage = createPrePrompt(message);
        console.log(newMessage)
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: newMessage,
            max_tokens: 1000,
            temperature: 0.9,
        });
        console.log(response.data.choices[0].message.content)
        ctx.body = {
        message: response.data.choices[0].message.content,
        };

        ctx.status = 200;
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});

// function createPrePrompt(originalMessage) {
//     const formatChat = [
//         {   "role": "system", 
//             "content": "Você é um assitente de atendimento ao cliente da Betta Global Partner e sua função é sanar dúvidas sobre curadoria de chatBots.Responda de maneira precisa. Caso não saiba a informação, responda polidamente que não sabe e nesse caso recomende uma visita ao site: https://www.betta.gp/."
//         },
    
//         {
//             "role": "user",
//             "content": originalMessage
//         },   
//     ]
//   return formatChat;
// }

