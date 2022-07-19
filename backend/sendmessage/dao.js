const AWS = require('aws-sdk');
const {v4: uuidv4} = require('uuid');
const { TABLE_NAME } = process.env;
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: process.env.AWS_REGION});

const getRoom = async (roomId) => {
    await ddb.get({TableName: TABLE_NAME, Key: {'roomId': roomId}}).promise()
}

const addEmptyUserToRoom = async (userId, roomId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            id: roomId,
        },
        UpdateExpression: `SET users.#userId = :value`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":value": {},
        },
        ConditionExpression: `attribute_not_exists(users.#userId)`,
    }

    await ddb.update(updateParams).promise()
}

const setConnectionId = async (userId, roomId, connectionId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            id: roomId,
        },
        UpdateExpression: `SET users.#userId.connectionId = :connectionId`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":connectionId": connectionId,
        },
        ConditionExpression: `attribute_exists(users.#userId)`,
    }

    await ddb.update(updateParams).promise()
}

const setEstimate = async (userId, roomId, estimate) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            id: roomId,
        },
        UpdateExpression: `SET users.#userId.estimate = :estimate`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":estimate": estimate,
        },
        ConditionExpression: `attribute_exists(users.#userId)`,
    }

    await ddb.update(updateParams).promise()
}

const setJiraCase = async (roomId, jiraCase) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            id: roomId,
        },
        UpdateExpression: `SET jiraCase = :jiraCase`,
        ExpressionAttributeValues: {
            ":jiraCase": jiraCase,
        },
        ConditionExpression: `attribute_exists(jiraCase)`,
    }

    await ddb.update(updateParams).promise()
}

const setFlipped = async (roomId, flipped) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            id: roomId,
        },
        UpdateExpression: `SET flipped = :flipped`,
        ExpressionAttributeValues: {
            ":flipped": flipped,
        },
        ConditionExpression: `attribute_exists(flipped)`,
    }

    await ddb.update(updateParams).promise()
}

const joinRoom = async (userId, connectionId, roomId) => {
    await addEmptyUserToRoom(userId, roomId)
    await setConnectionId(userId, roomId, connectionId)
    await setEstimate(userId, roomId, null)
}

const selectCase = async (roomId, jiraCase) => {
    await setJiraCase(roomId, jiraCase)
    await setFlipped(roomId, false)
    const room = await getRoom(roomId)
    Promise.awaitAll(room.users.keys().map(async (userId) => {
        await setEstimate(userId, roomId, null)
    }))
}

const leaveRoom = async (roomId, userId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {id: roomId,},
        UpdateExpression: `REMOVE users.#userId`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ConditionExpression: `attribute_exists(users.#userId)`,
        ReturnValues: "ALL_NEW"
    }

    await ddb.update(updateParams).promise()
}

const getConnectionIdsInRoom = async (roomId) => {
    const room = await getRoom(roomId)
    return room.users.map(user => user.connectionId)
}

const disconnect = async (connectionId, roomId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {id: roomId,},
        UpdateExpression: `REMOVE users.#userId`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":connectionId": connectionId,
        },
        ConditionExpression: `users.#userId.connectionId = :connectionId`,
        ReturnValues: "ALL_NEW"
    }

    await ddb.update(updateParams).promise()
}

const createRoom = async (userId, connectionId) => {
    const newRoomId = uuidv4();
    const putParams = {
        TableName: process.env.TABLE_NAME,
        Item: {
            roomId: newRoomId,
            users: {
                [userId]: {
                    connectionId: connectionId,
                    estimate: null
                }
            },
            jiraCase: null,
            flipped: false
        }
    }
    await ddb.put(putParams).promise();
    return newRoomId
}

exports.getRoom = getRoom
exports.addEmptyUserToRoom = addEmptyUserToRoom
exports.setConnectionId = setConnectionId
exports.setEstimate = setEstimate
exports.setJiraCase = setJiraCase
exports.joinRoom = joinRoom
exports.selectCase = selectCase
exports.leaveRoom = leaveRoom
exports.getConnectionIdsInRoom = getConnectionIdsInRoom
exports.disconnect = disconnect
exports.setFlipped = setFlipped
exports.createRoom = createRoom