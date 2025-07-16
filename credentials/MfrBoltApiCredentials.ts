import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MfrBoltApiCredentials implements ICredentialType {
  name = 'mfrBoltApiCredentials';
  displayName = 'MfrBolt API Credentials';
  documentationUrl = 'https://documenter.getpostman.com/view/3999268/TVYCAzpK';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The API key for the MfrBolt API service',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.example.com',
      required: true,
      description: 'The base URL for the MfrBolt API service',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '=Bearer {{$credentials.apiKey}}',
        'Content-Type': 'application/json',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/mfrbolts',
      method: 'GET',
    },
  };
}