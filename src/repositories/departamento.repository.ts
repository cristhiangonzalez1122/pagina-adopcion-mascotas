import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, Departamento, DepartamentoRelations} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {
  public readonly ciudades: HasManyRepositoryFactory<
    Ciudad,
    typeof Departamento.prototype.id
  >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
    @repository.getter('CiudadRepository')
    protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudades = this.createHasManyRepositoryFactoryFor(
      'ciudades',
      ciudadRepositoryGetter,
    );
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
