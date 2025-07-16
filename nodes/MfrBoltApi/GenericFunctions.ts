import {
  IExecuteFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  IWebhookFunctions,
  IHttpRequestOptions,
  IHttpRequestMethods,
  NodeApiError,
  JsonObject
} from 'n8n-workflow';

export async function mfrBoltApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: any = {},
  query: any = {},
  headers: any = {},
): Promise<any> {
  const credentials = await this.getCredentials('mfrBoltApiCredentials');
  
  const options: IHttpRequestOptions = {
    method,
    body,
    qs: query,
    url: `${credentials['baseUrl']}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${credentials['apiKey']}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    json: true,
  };

  if (Object.keys(body).length === 0) {
    delete options.body;
  }

  try {
    return await this.helpers.httpRequest(options);
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }
}

export async function mfrBoltApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: any = {},
  query: any = {},
): Promise<any> {
  const returnData: any[] = [];
  let responseData;

  query.page = 1;
  query.limit = 100;

  do {
    responseData = await mfrBoltApiRequest.call(this, method, endpoint, body, query);
    
    if (responseData.data) {
      returnData.push.apply(returnData, responseData.data);
    } else {
      returnData.push.apply(returnData, responseData);
    }
    
    query.page++;
  } while (responseData.hasNextPage || (responseData.data && responseData.data.length === query.limit));

  return returnData;
}