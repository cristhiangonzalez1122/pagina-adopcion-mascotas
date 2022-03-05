import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Raza, Tipomascota} from '../models';
import {RazaRepository} from '../repositories';

export class RazaTipomascotaController {
  constructor(
    @repository(RazaRepository)
    public razaRepository: RazaRepository,
  ) {}

  @get('/razas/{id}/tipomascota', {
    responses: {
      '200': {
        description: 'Tipomascota belonging to Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipomascota)},
          },
        },
      },
    },
  })
  async getTipomascota(
    @param.path.number('id') id: typeof Raza.prototype.id,
  ): Promise<Tipomascota> {
    return this.razaRepository.tipomascota(id);
  }
}
