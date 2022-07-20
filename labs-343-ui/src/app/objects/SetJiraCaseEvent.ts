export interface SetJiraCaseEvent {
    type: "SELECT_CASE"
    data: {
        roomId: string
        jiraCase: string
    }
}
