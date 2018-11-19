# pipefitter

pipefitter performs automated tests and audits on your home internet connection. The first piece being implemented is referred to as the "Collector", which is the component responsible for performing tests and collecting data.

## Collector

Implemented in TypeScript. The goal is to have the interfaces defined well enough that implementing additional adapters (modems/routers), test services (the service used to perform the test), and reporters (where to report the data, Firbase is used by default). User friendly defaults are provided for all of these interfaces.

### Adapters

The term "adapter" refers to physical hardware that will be used in the test. This is usually your router, or a modem with an integrated router (usually provided by your internet service provider). By default this app supports a common Telus modem/router, the Actiontec TS3200M. Tests can be performed without a configured adapter, but less information (primarily number of connected clients) will be reported.

### Test Services

The services used to perform the speed test(s). By default Fast and Ookla are supported.

### Reporters

Responsible for reporting data after each test. By default a Firebase reporter is supported. Test reports are supplied using the interface below.

#### Reports

An object with complete test data generated after each test.

```typescript
export interface Report {
  download: number // speeds defined in kbits/s
  upload: number
  nConnectedClients: number
  uptime: number
  leaseTime: number
}
```
