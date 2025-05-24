const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Prokerala API credentials
const clientId = '20d7a87e-bbdf-4e15-9548-c6d0ef83a7fb';
const clientSecret = 'kl0LpnKrOrxw6ZyVIpnDbaRRCMLOPDtyH1DLltwc';

// Endpoint to get coordinates
app.get('/api/geocode', async (req, res) => {
    try {
        const { place } = req.query;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}&limit=1`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Geocoding error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get Nakshatra
app.post('/api/nakshatra', async (req, res) => {
    try {
        // Get access token
        const tokenResponse = await fetch('https://api.prokerala.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': clientId,
                'client_secret': clientSecret
            })
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            console.error('Token error:', errorData);
            throw new Error(`Failed to get access token: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();
        console.log('Token response:', tokenData);
        const accessToken = tokenData.access_token;

        // Get Nakshatra
        const { datetime, coordinates } = req.body;
        console.log('Request body:', { datetime, coordinates });

        const response = await fetch('https://api.prokerala.com/v2/astrology/birth-details', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                datetime,
                coordinates,
                timezone: "Asia/Kolkata"
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Prokerala API error:', errorData);
            throw new Error(`Prokerala API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Prokerala API response:', data);

        // Assuming Nakshatra is nested in the response data, e.g., data.data.nakshatra.name
        if (!data.data || !data.data.nakshatra || !data.data.nakshatra.name) {
             console.error("Could not get Nakshatra from API response:", data);
             throw new Error("Could not find Nakshatra in the API response.");
        }

        const nakshatra = data.data.nakshatra.name;
        res.json({ nakshatra });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: error.message,
            details: error.stack
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 