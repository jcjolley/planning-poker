export interface LeaveRoomEvent {
    type: "LEAVE_ROOM"
    data: {
        roomId: string
        userId: string
    }
}
