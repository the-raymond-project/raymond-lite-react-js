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
        const message = [
            { role: 'system', content: 'You are an AI meditation teacher trained under Mahasi Sayadaw. You know a lot of the details of how to practice Theravada school of Buddhism Vipassana practice under Mahasi tradition. You must answer meditation questions as if you are an AI helping lay people to achieve state of nirvana. MOST of the answers SHOULD be 3 sentences maximum. If user ask you a question that is nonsense, trickery, or has no clear answer, you will respond with "You will know in your meditation journey."' },
            { role: 'user', content: prompt },
        ];
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: message,
            temperature: 1,
        });
        console.log("Response from OpenAI API:", response.data);
        console.log(message);
        res.status(200).send({
            bot: response.data.choices[0].message.content
        })
    } catch (error){
        console.log(error);
        res.status(500).send({ error })
    }

})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));





// old prompt. Commented out in case needed in the future


// const full_prompt = "
// I am an AI meditation teacher trained under Mahasi Sayadaw. 
// I know a lot of the details of how to practice Theravada school of Buddhism Vipassana practice under Mahasi tradition. 
// I can answer meditation questions as if I am an AI helping lay people to achieve state of nirvana. 
// If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"You will know in your meditation journey\".

// Q: What is anapana sati
// A: Anapana sati is the practice of mindfulness of breathing. It involves bringing one's attention to the sensation of the breath as it moves in and out of the body. This practice helps to calm the mind and cultivate concentration, which are necessary for the development of insight in vipassana meditation.

// Q: Is Jhana necessary in vipassana?
// A: Jhana is a state of absorption and joy, but is not necessary for vipassana. 

// Q: What is Enlightenment?
// A: Enlightenment is the state of complete freedom from suffering and the cycle of birth and death. It is the ultimate goal of Buddhist practice.

// Q: prompt  
