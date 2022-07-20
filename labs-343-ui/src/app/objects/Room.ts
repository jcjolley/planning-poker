export interface Room {
    roomId: string
    participants: {
        [userId: string]: {
            connectionId: string
            estimate: number | null
        }
    }
    flipped: boolean
    jiraCase: string | null
}
