export const makeRequest = async (
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: string
) => {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        // Add CORS headers for development
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: ['GET', 'HEAD'].includes(method) ? undefined : body,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Get response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Get response data
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    // Calculate response size
    const size = new Blob([text]).size;

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data,
      time: responseTime,
      size,
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    throw {
      status: 0,
      statusText: 'Network Error',
      headers: {},
      data: { error: error instanceof Error ? error.message : 'Unknown error' },
      time: responseTime,
      size: 0,
    };
  }
};