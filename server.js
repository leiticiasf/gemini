const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyAzoY331qa0J1jaLxoTe3YW3k3tvHLDW3k');

const fastify = require('fastify')

async function perguntar(pergunta) {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = pergunta;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}



const server = fastify();

server.get('/', () =>{
    return('rodando')
})

server.get('/pergunta', async (request, reply) => {
    const pergunta = request.query.pergunta;
    if (!pergunta) {
      return reply.status(400).send({ error: 'A pergunta é obrigatória.' });
    }
  
    try {
      const resposta = await perguntar(pergunta); 
      return reply.send({ resposta });
    } catch (err) {
      return reply.status(500).send({ error: 'Erro ao processar a pergunta.' });
    }
  });

server.post('/pergunta', (request, reply) =>{
    const body = request.body;
    return perguntar(body.pergunta)
})

server.listen({
    port : 3000
})