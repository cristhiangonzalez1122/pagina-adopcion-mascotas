import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Tipomascota, TipomascotaRelations, Raza} from '../models';
import {RazaRepository} from './raza.repository';

export class TipomascotaRepository extends DefaultCrudRepository<
  Tipomascota,
  typeof Tipomascota.prototype.id,
  TipomascotaRelations
> {

  public readonly razas: HasManyRepositoryFactory<Raza, typeof Tipomascota.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>,
  ) {
    super(Tipomascota, dataSource);
    this.razas = this.createHasManyRepositoryFactoryFor('razas', razaRepositoryGetter,);
    this.registerInclusionResolver('razas', this.razas.inclusionResolver);
  }
}
