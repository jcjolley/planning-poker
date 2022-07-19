const {disconnect, getConnectionIdsInRoom} = require("./dao");

const broadcast = async ({ apigwManagementApi, roomId }, payload) => {

    const postCalls = getConnectionIdsInRoom(roomId).map(async (connectionId) => {
        try {
            await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: payload }).promise();
        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await disconnect(connectionId, roomId)
            } else {
                throw e;
            }
        }
    });

    await Promise.all(postCalls);
}

exports.broadcast = broadcast