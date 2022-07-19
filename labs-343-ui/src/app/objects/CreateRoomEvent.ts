export interface CreateRoomEvent {
    type: "CREATE_ROOM"
    data: {
        userId: string
    }
}