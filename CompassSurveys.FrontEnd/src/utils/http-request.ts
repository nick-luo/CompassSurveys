const sendRequest = (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  return fetch(endpoint, options);
};

const sendRequestAndCheck = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  try {
    const response: Response = await sendRequest(endpoint, options);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Request an entity from an API endpoint.
 * @param {String} endpoint A URL formatted String.
 * @param {String} requestType The type of HTTP method to use as supported by Axios. One of; delete, get, patch, post, put.
 * @param {Object} body The request body, in a JSON parsable Object. Will be converted to JSON.
 * @param {Object} headers The request headers.
 */
export const entityRequest = async (
  endpoint: string,
  requestType = 'GET',
  body?: object,
  headers?: object,
): Promise<any> => {
  const sendHeaders: any = {
    Accept: 'application/json',
  };

  const sendBody = body
    ? JSON.stringify(body)
    : requestType === 'PATCH'
    ? '{}'
    : body;

  if (sendBody) {
    sendHeaders['Content-Type'] = 'application/json';
  }

  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      sendHeaders[key] = value;
    }
  }

  const response: Response = await sendRequestAndCheck(endpoint, {
    headers: sendHeaders,
    method: requestType,
    body: sendBody as BodyInit,
  });

  if (response.ok) {
    return response.json();
  }

  const err = await response.json();
  throw err;
};
