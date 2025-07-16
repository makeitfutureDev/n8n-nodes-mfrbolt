"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfrBoltApi = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class MfrBoltApi {
    constructor() {
        this.description = {
            displayName: 'MfrBolt API',
            name: 'mfrBoltApi',
            icon: 'file:mfrboltapi.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume MfrBolt API',
            defaults: {
                name: 'MfrBolt API',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [
                {
                    name: 'mfrBoltApiCredentials',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'MfrBolt',
                            value: 'mfrBolt',
                        },
                    ],
                    default: 'mfrBolt',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a new MfrBolt',
                            action: 'Create a MfrBolt',
                        },
                        {
                            name: 'Get',
                            value: 'get',
                            description: 'Get a MfrBolt',
                            action: 'Get a MfrBolt',
                        },
                    ],
                    default: 'get',
                },
                // Get MfrBolt Fields
                {
                    displayName: 'MfrBolt ID',
                    name: 'mfrBoltId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['get'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'The ID of the MfrBolt to retrieve',
                },
                // Create MfrBolt Fields
                {
                    displayName: 'MfrBolt Name',
                    name: 'mfrBoltName',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'The name of the MfrBolt to create',
                },
                {
                    displayName: 'MfrBolt Description',
                    name: 'mfrBoltDescription',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'The description of the MfrBolt',
                },
                {
                    displayName: 'MfrBolt Email',
                    name: 'mfrBoltEmail',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'The email address of the MfrBolt',
                },
                {
                    displayName: 'MfrBolt Phone',
                    name: 'mfrBoltPhone',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'The phone number of the MfrBolt',
                },
                {
                    displayName: 'MfrBolt Address',
                    name: 'mfrBoltAddress',
                    type: 'string',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'The address of the MfrBolt',
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    displayOptions: {
                        show: {
                            resource: ['mfrBolt'],
                            operation: ['create'],
                        },
                    },
                    default: {},
                    options: [
                        {
                            displayName: 'Website',
                            name: 'website',
                            type: 'string',
                            default: '',
                            description: 'The website URL of the MfrBolt',
                        },
                        {
                            displayName: 'Industry',
                            name: 'industry',
                            type: 'string',
                            default: '',
                            description: 'The industry of the MfrBolt',
                        },
                        {
                            displayName: 'Size',
                            name: 'size',
                            type: 'string',
                            default: '',
                            description: 'The size of the MfrBolt',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'mfrBolt') {
                    if (operation === 'get') {
                        // Get MfrBolt
                        const mfrBoltId = this.getNodeParameter('mfrBoltId', i);
                        const endpoint = `/mfrbolts/${mfrBoltId}`;
                        const responseData = await GenericFunctions_1.mfrBoltApiRequest.call(this, 'GET', endpoint);
                        const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                        returnData.push(...executionData);
                    }
                    else if (operation === 'create') {
                        // Create MfrBolt
                        const mfrBoltName = this.getNodeParameter('mfrBoltName', i);
                        const mfrBoltDescription = this.getNodeParameter('mfrBoltDescription', i);
                        const mfrBoltEmail = this.getNodeParameter('mfrBoltEmail', i);
                        const mfrBoltPhone = this.getNodeParameter('mfrBoltPhone', i);
                        const mfrBoltAddress = this.getNodeParameter('mfrBoltAddress', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            name: mfrBoltName,
                        };
                        if (mfrBoltDescription) {
                            body.description = mfrBoltDescription;
                        }
                        if (mfrBoltEmail) {
                            body.email = mfrBoltEmail;
                        }
                        if (mfrBoltPhone) {
                            body.phone = mfrBoltPhone;
                        }
                        if (mfrBoltAddress) {
                            body.address = mfrBoltAddress;
                        }
                        // Add additional fields
                        if (additionalFields.website) {
                            body.website = additionalFields.website;
                        }
                        if (additionalFields.industry) {
                            body.industry = additionalFields.industry;
                        }
                        if (additionalFields.size) {
                            body.size = additionalFields.size;
                        }
                        const endpoint = '/mfrbolts';
                        const responseData = await GenericFunctions_1.mfrBoltApiRequest.call(this, 'POST', endpoint, body);
                        const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                        returnData.push(...executionData);
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: error instanceof Error ? error.message : String(error) }), { itemData: { item: i } });
                    returnData.push(...executionData);
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.MfrBoltApi = MfrBoltApi;
