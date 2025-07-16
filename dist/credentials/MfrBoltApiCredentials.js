"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfrBoltApiCredentials = void 0;
class MfrBoltApiCredentials {
    constructor() {
        this.name = 'mfrBoltApiCredentials';
        this.displayName = 'MfrBolt API Credentials';
        this.documentationUrl = 'https://documenter.getpostman.com/view/3999268/TVYCAzpK';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'Authorization': '=Bearer {{$credentials.apiKey}}',
                    'Content-Type': 'application/json',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/mfrbolts',
                method: 'GET',
            },
        };
    }
}
exports.MfrBoltApiCredentials = MfrBoltApiCredentials;
