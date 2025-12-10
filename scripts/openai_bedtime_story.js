import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const response = await openai.responses.create({
    model: 'gpt-4o',
    input: 'Write a one-sentence bedtime story about a unicorn.'
  });

  console.log(response.output_text);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(err => console.error('OpenAI error', err));
}
