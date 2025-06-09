const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const TOGETHER_URL = 'https://api.together.xyz/v1/chat/completions';

router.post('/ai', async (req, res) => {
  const { entry } = req.body;

  try {
    const response = await axios.post(
      TOGETHER_URL,
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // You can also try llama-3 or qwen
        messages: [
          { role: 'system', content: 'You are a kind and encouraging journal assistant.' },
          { role: 'user', content: entry }
        ],
        max_tokens: 200,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (error) {
    console.error('Together.ai Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response. Please try again later.' });
  }
});

module.exports = router;
