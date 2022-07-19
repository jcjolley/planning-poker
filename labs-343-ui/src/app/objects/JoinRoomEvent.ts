export interface JoinRoomEvent {
    type: "JOIN_ROOM"
    data: {
        userId: string
        roomId: string
    }
}