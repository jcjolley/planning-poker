export interface Room {
    roomId: string
    users: {
        [userId: string]: {
            connectionId: string
            estimation: number | null
        }
    }
    flipped: boolean
    jiraCase: string | null
}