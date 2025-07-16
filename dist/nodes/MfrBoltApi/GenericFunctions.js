"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mfrBoltApiRequest = mfrBoltApiRequest;
exports.mfrBoltApiRequestAllItems = mfrBoltApiRequestAllItems;
const n8n_workflow_1 = require("n8n-workflow");
async function mfrBoltApiRequest(method, endpoint, body = {}, query = {}, headers = {}) {
    const credentials = await this.getCredentials('mfrBoltApiCredentials');
    const options = {
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
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function mfrBoltApiRequestAllItems(method, endpoint, body = {}, query = {}) {
    const returnData = [];
    let responseData;
    query.page = 1;
    query.limit = 100;
    do {
        responseData = await mfrBoltApiRequest.call(this, method, endpoint, body, query);
        if (responseData.data) {
            returnData.push.apply(returnData, responseData.data);
        }
        else {
            returnData.push.apply(returnData, responseData);
        }
        query.page++;
    } while (responseData.hasNextPage || (responseData.data && responseData.data.length === query.limit));
    return returnData;
}
