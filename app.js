const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyAzoY331qa0J1jaLxoTe3YW3k3tvHLDW3k');

async function run() {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "faça uma piada"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();