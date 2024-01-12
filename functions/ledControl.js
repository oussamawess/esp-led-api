// functions/ledControl.js

exports.handler = async (event, context) => {
    try {
      if (event.httpMethod === 'GET') {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'GET request handled' }),
        };
      } else if (event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'POST request handled', data }),
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
  