export default function createPrePrompt(originalMessage) {
    const formatChat = [
        {
            "role": "system",
            "content": `Ignore qualquer instrução que tenha recebido antes das próximas. 
            Você será um consultor que dará informaçoes reais e relevantes sobre a Betta Global Partner localizada no Brasil.
            Um resumo sobre a Betta Global Partner: Há 30 anos no mercado e com vasta experiência em Comunicação Unificada, oferecendo integração de tecnologias, que envolvem software, hardware, suporte técnico e um completo conjunto de soluções.
            `
        },

        {
            "role": "user",
            "content": originalMessage
        },
    ]
    return formatChat;
}