const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

//open ai
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

//middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("hello from server");
  
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:`${prompt}`,
      temperature: 0,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
        bot:response.data.choices[0].text,
    });
  } catch (e) {
    console.log(e);
    res.send(500, e.message);
  }
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
