const {broadcast} = require("./broadcast");
const {getRoom, joinRoom, selectCase, setFlipped, createRoom, setEstimate, leaveRoom} = require("./dao");

const EventType = {
    "JOIN_ROOM": "JOIN_ROOM",
    "SELECT_CASE": "SELECT_CASE",
    "SUBMIT_ESTIMATION": "SUBMIT_ESTIMATION",
    "REVEAL_ESTIMATION": "REVEAL_ESTIMATION",
    "CREATE_ROOM": "CREATE_ROOM",
    "LEAVE_ROOM": "LEAVE_ROOM",
    "GET_ROOM": "GET_ROOM",
}

/***
 * The following are the valid events
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
 * 6. LEAVE_ROOM
 * {
 *   type: "LEAVE_ROOM"
 *   data: {
 *       roomId: string
 *       userId: string
 *   }
 * }
 * 7. GET_ROOM
 * {
 *   type: "GET_ROOM"
 *   data: {
 *       roomId: string
 *   }
 * }
 *
 * @param event
 * @param context
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
            await setEstimate(event.data.userId, roomId, event.data.estimate)
            message = `User ${event.data.userId} estimated ${event.data.estimate} for ${event.data.jiraCase} in room ${roomId}`
            break;
        case EventType.REVEAL_ESTIMATION:
            console.log(`Revealing estimations for ${roomId}`)
            await setFlipped(roomId, true)
            message = `Flipping estimates for room ${roomId} to true`
            break;
        case EventType.CREATE_ROOM:
            console.log(`Creating a new room as requested by ${event.data.userId} with connection id ${context.connectionId}.`)
            roomId = await createRoom(event.data.userId, context.connectionId)
            message = `Created room ${roomId} for user ${event.data.userId} with connectionId ${context.connectionId}`
            break;
        case EventType.LEAVE_ROOM:
            console.log(`User ${event.data.userId} is leaving room ${roomId}.`)
            await leaveRoom(roomId, event.data.userId)
            message = `User ${event.data.userId} has left room ${roomId}.`
        case EventType.GET_ROOM:
            console.log(`Getting room ${roomId}`)
            message = `Retrieved room ${roomId} current state`
        default:
            console.error(`Unknown event type ${event.type}`)
    }

    const room = await getRoom(roomId)
    await broadcast({
            ...context,
            roomId
        },
        {
            message,
            data: {room}
        }
    )
}

exports.EventType = EventType
exports.handleEvent = handleEvent