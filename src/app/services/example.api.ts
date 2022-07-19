import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

export interface ExampleData {
  exampleField: string
}

@Injectable()
export class ExampleApi {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly baseUrl = '/example-ws/endpoint'

  getExampleData(): Observable<ExampleData> {
    return this.httpClient.get<ExampleData>(this.baseUrl)
  }
}
