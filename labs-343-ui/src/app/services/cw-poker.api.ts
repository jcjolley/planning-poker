import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { CreateRoomEvent } from '../objects/CreateRoomEvent'
import { JoinRoomEvent } from '../objects/JoinRoomEvent'
import { Room } from '../objects/Room'

export interface ExampleData {
  exampleField: string
}

@Injectable({
  providedIn: 'root',
})
export class CwPokerApi {
  constructor(private readonly httpClient: HttpClient) { }

  private readonly baseUrl = '/' //

  private readonly actualWebSocket: WebSocketSubject<string> = webSocket({
    url: 'wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod',
  });
  public $webSocket: Observable<Room> = this.actualWebSocket.asObservable().pipe(
    map(response => JSON.parse(response) as Room),
  );

  getExampleData(): Observable<ExampleData> {
    return this.httpClient.get<ExampleData>(this.baseUrl)
  }

  createRoom(userId: string) {
    const createRoomEvent: CreateRoomEvent = {
      type: 'CREATE_ROOM',
      data: { userId, },
    }
    this.actualWebSocket.next(JSON.stringify({
      action: 'sendmessage',
      data: createRoomEvent,
    }))
    return this.actualWebSocket.asObservable()
  }

  joinRoom(userId: string, roomId: string) {
    const joinRoomEvent: JoinRoomEvent = {
      type: 'JOIN_ROOM',
      data: { roomId, userId, }
    }
    this.actualWebSocket.next(JSON.stringify({
      action: 'sendmessage',
      data: joinRoomEvent,
    }))
    return this.actualWebSocket.asObservable()
  }
}
