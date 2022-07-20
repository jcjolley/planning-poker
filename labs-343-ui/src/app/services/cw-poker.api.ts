import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Observer, of, Subject, Subscription } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
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

  private readonly actualWebSocket = this.create('wss://a5vtzw7brk.execute-api.us-west-2.amazonaws.com/Prod');
  public $webSocket: Observable<Room> = this.actualWebSocket.asObservable().pipe(
    map(response => {
      return JSON.parse(response.data).data.room as Room
    }),
    catchError(err => {
      console.log(err)
      return of({
        roomId: '0',
      } as Room)
    }),
  );
  public roomSub: Subscription | null = null;

  createRoom(userId: string) {
    const createRoomEvent: CreateRoomEvent = {
      type: 'CREATE_ROOM',
      data: { userId, },
    }
    const message = {
      action: 'sendmessage',
      data: createRoomEvent,
    }
    this.actualWebSocket.next(message as unknown as MessageEvent)
    return this.$webSocket
  }

  joinRoom(userId: string, roomId: string) {
    const joinRoomEvent: JoinRoomEvent = {
      type: 'JOIN_ROOM',
      data: { roomId, userId, }
    }
    const message = {
      action: 'sendmessage',
      data: joinRoomEvent,
    }
    this.actualWebSocket.next(message as unknown as MessageEvent)
    return this.$webSocket
  }

  private create(url: string): Subject<MessageEvent<string>> {
    let ws = new WebSocket(url)

    let observable = Observable.create((obs: Observer<MessageEvent<string>>) => {
      ws.onmessage = obs.next.bind(obs)
      ws.onerror = obs.error.bind(obs)
      ws.onclose = obs.complete.bind(obs)
      return ws.close.bind(ws)
    })
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data))
        }
      }
    }
    return Subject.create(observer, observable)
  }
}
