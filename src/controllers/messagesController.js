import messages from "../models/Message.js";
import { OpenAIApi, Configuration } from "openai";
import createPrePrompt from "../services/promptManager.js"
import { getEnvVar } from "../config/serverConfig.js";

const envVar = getEnvVar()


const configuration = new Configuration({
    apiKey: envVar.OPENAI_API_KEY,
});

class MessageController {

    static buscaMensagemPorId = async (ctx) => {
        const id = ctx.params.id;
        console.log(id);
        try {
            const mensagem = await messages.findById(id).exec();
            if (!mensagem) {
                ctx.response.status = 404;
                ctx.body = { message: `${err.message} - Dialogo não localizado.` };
            } else {
                ctx.response.status = 200;
                ctx.body = mensagem;
            }
        } catch (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.body = { message: "Erro ao buscar mensagem" };
        }
    }

    static passPrompt = async (ctx) => {
        const { message } = ctx.request.body;
        const newMessage = createPrePrompt(message);
        console.log(newMessage)
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: newMessage,
            max_tokens: 1000,
            temperature: 0.5,
        });
        console.log(response.data.choices[0].message.content)
        ctx.body = {
            message: response.data.choices[0].message.content,
        };

        ctx.status = 200;

    }


}

export default MessageController;