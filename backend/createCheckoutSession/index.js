const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { imageId, amount } = body;

  if (!imageId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing imageId' })
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: imageId,
          },
          custom_unit_amount: {
            enabled: true,
            minimum: 0,
            maximum: 1000,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/download?imageId=${imageId}`,
    cancel_url: `${process.env.BASE_URL}/photos`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};