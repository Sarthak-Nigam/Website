const express = require('express');
const app = express();
app.use(express.json()); // To handle JSON inputs

// Waiter responding to the GET request
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

// Waiter responding to the POST request
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = data.filter(item => !isNaN(item)); // Find numbers
    const alphabets = data.filter(item => isNaN(item)); // Find letters
    const lowercaseAlphabets = alphabets.filter(c => c === c.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

    const fileValid = !!file_b64;
    const fileMimeType = file_b64 ? "image/png" : null; // Simplified MIME type detection
    const fileSizeKB = file_b64 ? (Buffer.from(file_b64, 'base64').length / 1024) : null;

    // Respond with the data to the customer (POST request)
    res.json({
        is_success: true,
        user_id: "your_name_22092002",
        email: "your_email@srm.com",
        roll_number: "CSE123456",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
