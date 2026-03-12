const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the High-Performance Engine
app.listen(PORT, () => {
    console.log(`\n🚀 CREAZIFY 2026 ENGINE ACTIVATED`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌐 Environment: Production-Ready\n`);
});
