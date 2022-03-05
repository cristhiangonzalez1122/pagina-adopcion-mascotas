import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations, SolicitudAdopcion} from '../models';
import {SolicitudAdopcionRepository} from './solicitud-adopcion.repository';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {

  public readonly SolicitudesDeAdopcion: HasManyRepositoryFactory<SolicitudAdopcion, typeof EstadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudAdopcionRepository') protected solicitudAdopcionRepositoryGetter: Getter<SolicitudAdopcionRepository>,
  ) {
    super(EstadoSolicitud, dataSource);
    this.SolicitudesDeAdopcion = this.createHasManyRepositoryFactoryFor('SolicitudesDeAdopcion', solicitudAdopcionRepositoryGetter,);
    this.registerInclusionResolver('SolicitudesDeAdopcion', this.SolicitudesDeAdopcion.inclusionResolver);
  }
}
