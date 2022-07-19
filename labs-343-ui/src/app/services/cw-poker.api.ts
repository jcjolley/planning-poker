import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { uniqueId } from 'lodash-es'
import { Observable, of } from 'rxjs'
import { webSocket } from 'rxjs/webSocket'
import { JoinRoomEvent } from '../objects/JoinRoomEvent'

export interface ExampleData {
  exampleField: string
}

@Injectable({
  providedIn: 'root',
})
export class CwPokerApi {
  constructor(private readonly httpClient: HttpClient) { }

  private readonly baseUrl = '/' //

  private readonly actualWebSocket = webSocket('wss://msza32vqp3.execute-api.us-west-2.amazonaws.com/Prod');
  public $webSocket = this.actualWebSocket.asObservable();

  getExampleData(): Observable<ExampleData> {
    return this.httpClient.get<ExampleData>(this.baseUrl)
  }

  createRoom(userName: string) {
    return of(uniqueId())
    // return this.httpClient.post<string>(`${this.baseUrl}/create-room`, userName);
  }

  joinRoom(userId: string, roomId: string) {
    const joinRoomEvent: JoinRoomEvent = {
      type: 'JOIN_ROOM',
      data: { roomId, userId, }
    }
    this.actualWebSocket.next(joinRoomEvent)
    return this.actualWebSocket.asObservable()
  }
}
