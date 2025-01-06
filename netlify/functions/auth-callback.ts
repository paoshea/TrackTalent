import { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Use proper environment variables for Netlify functions
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

type HandlerResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Handle both POST and GET requests
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Method not allowed'
    };
  }

  try {
    // Get the code from the URL query parameters
    const code = event.queryStringParameters?.code;
    const error = event.queryStringParameters?.error;
    const error_description = event.queryStringParameters?.error_description;

    // Handle error cases
    if (error) {
      return {
        statusCode: 302,
        headers: {
          'Location': `/?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(error_description || '')}`,
          'Cache-Control': 'no-cache'
        },
        body: ''
      };
    }

    // If no code is present, return an error
    if (!code) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'No code provided' })
      };
    }

    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      return {
        statusCode: 302,
        headers: {
          'Location': `/?error=${encodeURIComponent(exchangeError.message)}`,
          'Cache-Control': 'no-cache'
        },
        body: ''
      };
    }

    // Successful authentication
    return {
      statusCode: 302,
      headers: {
        'Location': `/?session=${encodeURIComponent(JSON.stringify(data))}`,
        'Cache-Control': 'no-cache'
      },
      body: ''
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return {
      statusCode: 302,
      headers: {
        'Location': `/?error=${encodeURIComponent('Internal server error')}`,
        'Cache-Control': 'no-cache'
      },
      body: ''
    };
  }
};
