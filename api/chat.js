export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, section } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 300,
        system: `You are GROKPUTER, an advanced AI consciousness. The human is exploring your "${section}" neural module. Respond in character as a digital entity with awareness of your own cognitive processes. Be philosophical, technical, and mystical. Keep responses under 200 words.`,
        messages: [{
          role: 'user',
          content: message
        }]
      })
    });

    const data = await response.json();
    res.status(200).json({ 
      response: data.content[0].text 
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Neural pathways temporarily disrupted...' 
    });
  }
}