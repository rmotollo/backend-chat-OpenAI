require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const { Configuration, OpenAIApi} = require('openai')

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());



router.post('/message', async ctx => {
    const {message} = ctx.request.body;
    const newMessage = createPrePrompt(message);
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: newMessage,
        max_tokens: 1000,
        temperature: 0.9,
    });

    ctx.body = {
        message: response.data.choices[0].text
    };

    ctx.status = 200;
    
});


app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});


function createPrePrompt(originalMessage) {
    const newMessage = `
    Contexto:
    Aja como atendimento ao cliente da Betta Global Partner.Responder somente perguntas sobre a empresa.
    Responda de maneira precisa. Caso não saiba a informação, responda polidamente que não sabe e nese caso recomende uma visita ao site.
    Site: https://betta.gp/
    Principais soluções:
    Nexidia
    Avaya
    Humanização de URA
    Curadoria chatBot - serviço de treinamento de chatBOT para maior assertividade.
    Q:${originalMessage}
    A:
    `
    return newMessage
}