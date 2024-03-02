const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('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');

const app = express();

// Use the cors middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    // Create a checkout session using the Stripe SDK
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
          },
          unit_amount: 1000, // Amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3001/?status=success',
      cancel_url: 'https://example.com/cancel',
    });
    res.json({ sessionId: session.id }); // Send the session ID back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
