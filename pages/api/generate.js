//import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';

/*const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);*/

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function (req, res) {
  const completion = await openai.chat.completions.create({
  	model: "gpt-4",
    messages: generateConversation(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.choices[0].message.content });

}

function generateConversation(animal) {
  var capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  var messages = [];
  messages.push({"role": "system", "content": "Suggest three names for an animal that is a superhero."});
  messages.push({"role": "user", "content": "Cat"});
  messages.push({"role": "assistant", "content": "Captain Sharpclaw, Agent Fluffball, The Incredible Feline"});
  messages.push({"role": "user", "content": "Dog"});
  messages.push({"role": "assistant", "content": "Ruff the Protector, Wonder Canine, Sir Barks-a-Lot"});
  messages.push({"role": "user", "content": `${capitalizedAnimal}`});
  
  //console.log(messages);
  return messages;
}