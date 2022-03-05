import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Raza, RazaRelations, Tipomascota, Mascota} from '../models';
import {TipomascotaRepository} from './tipomascota.repository';
import {MascotaRepository} from './mascota.repository';

export class RazaRepository extends DefaultCrudRepository<
  Raza,
  typeof Raza.prototype.id,
  RazaRelations
> {

  public readonly tipomascota: BelongsToAccessor<Tipomascota, typeof Raza.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Raza.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TipomascotaRepository') protected tipomascotaRepositoryGetter: Getter<TipomascotaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Raza, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.tipomascota = this.createBelongsToAccessorFor('tipomascota', tipomascotaRepositoryGetter,);
    this.registerInclusionResolver('tipomascota', this.tipomascota.inclusionResolver);
  }
}
