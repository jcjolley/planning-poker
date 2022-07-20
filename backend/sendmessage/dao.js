const AWS = require('aws-sdk');
const {v4: uuidv4} = require('uuid');
const {TABLE_NAME} = process.env;
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: process.env.AWS_REGION});

const getRoom = async (roomId) => {
    const room = (await ddb.get({TableName: TABLE_NAME, Key: {'roomId': roomId}}).promise()).Item
    console.log(`DAO: getRoom result: ${JSON.stringify(room)}`)
    return room
}

const addEmptyUserToRoom = async (userId, roomId) => {
    try {
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                roomId,
            },
            UpdateExpression: `SET participants.#userId = :value`,
            ExpressionAttributeNames: {
                "#userId": userId
            },
            ExpressionAttributeValues: {
                ":value": {},
            },
            ConditionExpression: `attribute_not_exists(participants.#userId)`,
        }

        await ddb.update(updateParams).promise()
    } catch (e) {
        if (e?.name === "ConditionalCheckFailedException") {
            console.log(`User ${userId} already in room ${roomId}`)
        } else {
            console.error(`Error adding user to room: `, e)
        }
    }
}

const setConnectionId = async (userId, roomId, connectionId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            roomId,
        },
        UpdateExpression: `SET participants.#userId.connectionId = :connectionId`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":connectionId": connectionId,
        },
        ConditionExpression: `attribute_exists(participants.#userId)`,
    }

    await ddb.update(updateParams).promise()
}

const setEstimate = async (userId, roomId, estimate) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            roomId,
        },
        UpdateExpression: `SET participants.#userId.estimate = :estimate`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ExpressionAttributeValues: {
            ":estimate": estimate,
        },
        ConditionExpression: `attribute_exists(participants.#userId)`,
    }

    await ddb.update(updateParams).promise()
}

const setJiraCase = async (roomId, jiraCase) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            roomId,
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
            roomId,
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
    await Promise.all(Object.keys(room.participants).map(async (userId) => {
        setEstimate(userId, roomId, null)
    }))
}

const leaveRoom = async (roomId, userId) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {roomId},
        UpdateExpression: `REMOVE participants.#userId`,
        ExpressionAttributeNames: {
            "#userId": userId
        },
        ConditionExpression: `attribute_exists(participants.#userId)`,
        ReturnValues: "ALL_NEW"
    }

    await ddb.update(updateParams).promise()
}

const getConnectionIdsInRoom = async (roomId) => {
    console.log(`DAO: Getting connection ids in room ${roomId}`)
    const room = await getRoom(roomId)
    return Object.values(room?.participants).map(user => user.connectionId)
}

const disconnect = async (connectionId, roomId) => {
    const room = await getRoom(roomId)
    await Promise.all(Object.keys(room.participants)
        .filter(userId => room.participants[userId].connectionId === connectionId)
        .map(userId => {
            const updateParams = {
                TableName: TABLE_NAME,
                Key: {roomId},
                UpdateExpression: `REMOVE participants.#userId`,
                ExpressionAttributeNames: {
                    "#userId": userId
                },
                ExpressionAttributeValues: {
                    ":connectionId": connectionId,
                },
                ConditionExpression: `participants.#userId.connectionId = :connectionId`,
                ReturnValues: "ALL_NEW"
            }

            return ddb.update(updateParams).promise()
        }))
}

const createRoom = async (userId, connectionId) => {
    const roomId = uuidv4();
    try {
        console.log(`DAO: Creating room ${roomId}`)
        const putParams = {
            TableName: TABLE_NAME,
            Item: {
                roomId,
                participants: {
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
        console.log(`DAO: Successfully created room ${roomId}`)
    } catch (e) {
        console.error(`DAO: Failed to create room ${roomId}`, e)
    }
    return roomId
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