import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Write a one-sentence bedtime story about a unicorn.' }
    ]
  });

  console.log(response.choices[0].message.content);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(err => console.error('OpenAI error', err));
}
