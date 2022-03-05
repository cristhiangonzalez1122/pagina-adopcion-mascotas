import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Tipomascota, TipomascotaRelations} from '../models';

export class TipomascotaRepository extends DefaultCrudRepository<
  Tipomascota,
  typeof Tipomascota.prototype.id,
  TipomascotaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Tipomascota, dataSource);
  }
}
