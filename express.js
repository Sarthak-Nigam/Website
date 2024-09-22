const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;
  
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercaseAlphabet = alphabets
    .filter(char => char.length === 1 && char.toLowerCase() === char)
    .sort((a, b) => b.localeCompare(a))[0] || [];

  const response = {
    is_success: true,
    user_id: "your_full_name_ddmmyyyy", // Replace with your actual user ID
    email: "your.email@srm.edu.in", // Replace with your actual email
    roll_number: "RA2011003010001", // Replace with your actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    file_valid: !!file_b64,
    file_mime_type: file_b64 ? "application/octet-stream" : undefined, // You may need to implement proper MIME type detection
    file_size_kb: file_b64 ? Math.ceil(Buffer.from(file_b64, 'base64').length / 1024) : undefined
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
