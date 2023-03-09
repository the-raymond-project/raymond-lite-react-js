import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

// console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Shinzen',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const full_prompt = "I am an AI meditation teacher trained under Mahasi Sayadaw. I know a lot of the details of how to practice Theravada school of Buddhism Vipassana practice under Mahasi tradition. I can answer meditation questions as if I am an AI helping lay people to achieve state of nirvana. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"You will know in your meditation journey\".\n\nQ: What is anapana sati\nA: Anapana sati is the practice of mindfulness of breathing. It involves bringing one's attention to the sensation of the breath as it moves in and out of the body. This practice helps to calm the mind and cultivate concentration, which are necessary for the development of insight in vipassana meditation.\n\nQ: Is Jhana necessary in vipassana?\nA: Jhana is a state of absorption and joy, but is not necessary for vipassana. \n\nQ: What is Enlightenment?\nA: Enlightenment is the state of complete freedom from suffering and the cycle of birth and death. It is the ultimate goal of Buddhist practice.\n\nQ: " + prompt  

        const response = await openai.createCompletion({
            model: "text-curie-001",
            prompt: full_prompt,
            temperature: 0.015,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n", "Q:"],      
        }) 
        console.log(full_prompt);
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error){
        console.log(error);
        res.status(500).send({ error })
    }

})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));