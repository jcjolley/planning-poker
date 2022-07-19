import { PactWeb } from '@pact-foundation/pact-web'

declare const __karma__: { config: { pactPort: number } }

export class LocalhostPactWeb extends PactWeb {
  constructor() {
    super({
      host: '127.0.0.1',
      port: __karma__.config.pactPort,
    })
  }
}
