
const EventType = {
    "JOIN_ROOM": "JOIN_ROOM",
    "SELECT_CASE": "SELECT_CASE",
    "SUBMIT_ESTIMATION": "SUBMIT_ESTIMATION",
    "REVEAL_ESTIMATION": "REVEAL_ESTIMATION",
    "CREATE_ROOM": "CREATE_ROOM",
}

/***
 * There are four kinds of events.
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
 *
 * @param event
 */
const handleEvent = (event) => {
    switch (event.type) {
        case EventType.SELECT_CASE:
            console.log(`Selecting jira case ${event.data.jiraCase} in room ${event.data.roomId}`)
            break;
        case EventType.JOIN_ROOM:
            console.log(`User ${event.data.userId} is joining room ${event.data.roomId}`)
            break;
        case EventType.SUBMIT_ESTIMATION:
            console.log(`Submitting estimation ${event.data.estimate} to room ${event.data.roomId} for user ${event.data.userId}`)
            break;
        case EventType.REVEAL_ESTIMATION:
            console.log(`Revealing estimations for ${event.data.roomId}`)
            break;
        case EventType.CREATE_ROOM:
            console.log(`Creating room for ${event.data.userId}`)
            break;
        default:
            console.error(`Unknown event type ${event.type}`)
    }
}

export { EventType, handleEvent }