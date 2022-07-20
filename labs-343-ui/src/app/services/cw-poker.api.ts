import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Observer, of, Subject, Subscription } from 'rxjs'
import {catchError, map, shareReplay} from 'rxjs/operators'
import { CreateRoomEvent } from '../objects/CreateRoomEvent'
import { JoinRoomEvent } from '../objects/JoinRoomEvent'
import { Room } from '../objects/Room'
import {PointValue} from "../objects/PointValue";
import {SubmitEstimationEvent} from "../objects/SubmitEstimationEvent";
import {SetJiraCaseEvent} from "../objects/SetJiraCaseEvent";
import {RevealEstimationsEvent} from "../objects/RevealEstimationsEvent";

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
    shareReplay(1),
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

  setEstimation(userId: string, roomId: string, jiraCase: string, estimate: PointValue) {
    const submitEstimationEvent: SubmitEstimationEvent = {
      type: 'SUBMIT_ESTIMATION',
      data: { userId, roomId, jiraCase, estimate, }
    }
    const message = {
      action: 'sendmessage',
      data: submitEstimationEvent,
    }
    this.actualWebSocket.next(message as unknown as MessageEvent)
    return this.$webSocket
  }

  setJiraCase(roomId: string, jiraCase: string) {
    const setJiraCaseEvent: SetJiraCaseEvent = {
      type: 'SELECT_CASE',
      data: { roomId, jiraCase, }
    }
    const message = {
      action: 'sendmessage',
      data: setJiraCaseEvent,
    }
    this.actualWebSocket.next(message as unknown as MessageEvent)
    return this.$webSocket
  }

  revealEstimations(roomId: string) {
    const revealEstimationsEvent: RevealEstimationsEvent = {
      type: 'REVEAL_ESTIMATION',
      data: { roomId, }
    }
    const message = {
      action: 'sendmessage',
      data: revealEstimationsEvent,
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
