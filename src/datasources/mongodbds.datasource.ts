import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbds',
  connector: 'mongodb',
  url: 'mongodb+srv://proweb:proweb@cluster0.10cx2.mongodb.net/petSecurity?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'MascotasSecDB',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongobddsDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mongodbds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
