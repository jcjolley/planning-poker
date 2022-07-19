// Copyright 2018-2020Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const AWS = require('aws-sdk');
const {handleEvent} = require("./eventHandler");

exports.handler = async websocketMessage => {
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: websocketMessage.requestContext.domainName + '/' + websocketMessage.requestContext.stage
  });
  
  try {
    const event = JSON.parse(websocketMessage.body).data;
    handleEvent(event, { apigwManagementApi, connectionId: websocketMessage.requestContext.connectionId })
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};
