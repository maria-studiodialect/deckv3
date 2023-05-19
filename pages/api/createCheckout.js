// pages/api/createCheckout.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { lineItems } = req.body;

  const lineItemsString = lineItems
    .map(item => `{ quantity: ${item.quantity}, variantId: "${item.variantId}" }`)
    .join(', ');

  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItemsString}]
      }) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://deck-london-test.myshopify.com/api/2022-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `d38eea83f63f6e08fe0f9d6f6045d817`,
      },
      body: JSON.stringify({ query }),
    });

    // Add error handling here
    if (!response.ok) {
      console.error('Error response from Shopify API:', await response.text());
      throw new Error('Failed to fetch from Shopify API');
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    res.status(200).json(data.data.checkoutCreate.checkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
