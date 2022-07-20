export interface Room {
    roomId: string
    participants: {
        [userId: string]: {
            connectionId: string
            estimation: number | null
        }
    }
    flipped: boolean
    jiraCase: string | null
}
