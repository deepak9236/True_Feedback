const fetch = require('node-fetch');

const testAPI = async () => {
  const response = await fetch('http://localhost:3000/api/suggest-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response body is available
  if (!response.body) {
    throw new Error('No response body');
  }

  let result = '';

  // Readable stream handling for Node.js
  response.body.on('data', (chunk) => {
    result += chunk.toString(); // Decode the chunk as a string
  });

  response.body.on('end', () => {
    console.log(result); // Log the result when the stream ends
  });

  response.body.on('error', (err) => {
    console.error('Error reading response body:', err);
  });
};

testAPI().catch((error) => {
  console.error('Error:', error);
});
