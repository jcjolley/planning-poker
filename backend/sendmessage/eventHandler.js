
const EventType = {
    "JOIN_ROOM": "JOIN_ROOM",
    "SELECT_CASE": "SELECT_CASE",
    "SUBMIT_ESTIMATION": "SUBMIT_ESTIMATION",
    "REVEAL_ESTIMATION": "REVEAL_ESTIMATION"
}

/***
 * There are four kinds of events.
 * 1. SELECT_CASE
 * {
 *     type: EventType
 *     data: {
 *         jiraCase: string
 *         roomId: string
 *     }
 * }
 * 2. JOIN_ROOM
 * {
 *     type: EventType
 *     data: {
 *         userId: string
 *         roomId: string
 *     }
 * }
 * 3. SUBMIT_ESTIMATION
 * {
 *     type: EventType
 *     data: {
 *         userId: string
 *         roomId: string
 *         jiraCase: string
 *         estimate: number
 *     }
 * }
 * 4. REVEAL_ESTIMATION
 * {
 *     type: EventType
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
        default:
            console.error(`Unknown event type ${event.type}`)
    }
}

export { EventType, handleEvent }