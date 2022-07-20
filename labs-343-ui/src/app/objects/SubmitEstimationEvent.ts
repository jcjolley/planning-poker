export interface SubmitEstimationEvent {
    type: "SUBMIT_ESTIMATION"
    data: {
        userId: string
        roomId: string
        jiraCase: string
        estimate: number
    }
}
