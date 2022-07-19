const {broadcast} = require("./broadcast");
const {getRoom, joinRoom, selectCase, setFlipped} = require("./dao");

const EventType = {
    "JOIN_ROOM": "JOIN_ROOM",
    "SELECT_CASE": "SELECT_CASE",
    "SUBMIT_ESTIMATION": "SUBMIT_ESTIMATION",
    "REVEAL_ESTIMATION": "REVEAL_ESTIMATION",
    "CREATE_ROOM": "CREATE_ROOM"
}

/***
 * There are five kinds of events.
 * 1. SELECT_CASE
 * {
 *     type: "SELECT_CASE"
 *     data: {
 *         jiraCase: string
 *         roomId: string
 *     }
 * }
 * 2. JOIN_ROOM
 * {
 *     type: "JOIN_ROOM"
 *     data: {
 *         userId: string
 *         roomId: string
 *     }
 * }
 * 3. SUBMIT_ESTIMATION
 * {
 *     type: "SUBMIT_ESTIMATION"
 *     data: {
 *         userId: string
 *         roomId: string
 *         jiraCase: string
 *         estimate: number
 *     }
 * }
 * 4. REVEAL_ESTIMATION
 * {
 *     type: "REVEAL_ESTIMATION"
 *     data: {
 *         roomId: string
 *     }
 * }
 * 5. CREATE_ROOM
 * {
 *     type: "CREATE_ROOM"
 *     data: {
 *         roomId: string
 *         userId: string
 *     }
 * }
 *
 * @param event
 */
const handleEvent = async (event, context) => {
    let message;
    let roomId = event.data.roomId
    switch (event.type) {
        case EventType.SELECT_CASE:
            console.log(`Selecting jira case ${event.data.jiraCase} in room ${roomId}`)
            await selectCase(roomId, event.data.jiraCase)
            message = `Jira case ${event.data.jiraCase} selected in room ${roomId}`
            break;
        case EventType.JOIN_ROOM:
            console.log(`User ${event.data.userId} is joining room ${roomId}`)
            await joinRoom(event.data.userId, context.connectionId, roomId)
            message = `User ${event.data.userId} has joined ${roomId}`
            break;
        case EventType.SUBMIT_ESTIMATION:
            console.log(`Submitting estimation ${event.data.estimate} to room ${roomId} for user ${event.data.userId}`)
            setEstimate(event.data.userId, roomId, event.data.estimate)
            message = `User ${event.data.userId} estimated ${event.data.estimate} for ${event.data.jiraCase} in room ${roomId}`
            break;
        case EventType.REVEAL_ESTIMATION:
            console.log(`Revealing estimations for ${roomId}`)
            await setFlipped(roomId, true)
            message = `Flipping estimates for room ${roomId} to true`
            break;
        case EventType.CREATE_ROOM:
            console.log(`Creating a new room.`)
            roomId = await createRoom(event.data.userId)
            break;
        default:
            console.error(`Unknown event type ${event.type}`)
    }

    const room = await getRoom(roomId)
    await broadcast({
            ...context,
            roomId: roomId
        },
        {
            message,
            data: { room }
        }
    )
}

exports.EventType = EventType
exports.handleEvent = handleEvent