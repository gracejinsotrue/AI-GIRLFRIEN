const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI
});
const openai = new OpenAIApi(configuration);

async function getResponse(userInput) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
    });
    return response.data.choices[0].message.content;
}

getResponse("How are you?")
    .then(console.log)
    .catch(console.error);


``