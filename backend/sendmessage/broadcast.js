
const broadcast = async ({ apigwManagementApi, tableName, connectionData, roomId }, payload) => {

    const postCalls = connectionData.Items
        .map(async ({ connectionId }) => {
        try {
            await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: payload }).promise();
        } catch (e) {
            if (e.statusCode === 410) {
                console.log(`Found stale connection, deleting ${connectionId}`);
                await ddb.delete({ TableName: tableName, Key: { connectionId } }).promise();
            } else {
                throw e;
            }
        }
    });

    await Promise.all(postCalls);
}


export { broadcast }