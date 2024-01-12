// functions/ledControl.js

exports.handler = async (event, context) => {
    try {
      if (event.httpMethod === 'GET') {
        // Handle GET request
        const currentState = 1; // Replace with logic to get the actual state
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ id: 1, state: currentState }),
          };
          
      } else if (event.httpMethod === 'POST') {
        // Handle POST request
        const data = JSON.parse(event.body);
        const newState = data.state;
        // Replace with logic to update the actual state in your database
        return {
          statusCode: 200,
          body: JSON.stringify({ id: 1, state: newState }),
        };
      } else {
        return {
          statusCode: 405, // Method Not Allowed
          body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
      }
    } catch (error) {
      console.error('Error handling request:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  };
  