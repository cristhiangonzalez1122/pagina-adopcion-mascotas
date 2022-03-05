import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tipomascota,
  Raza,
} from '../models';
import {TipomascotaRepository} from '../repositories';

export class TipomascotaRazaController {
  constructor(
    @repository(TipomascotaRepository) protected tipomascotaRepository: TipomascotaRepository,
  ) { }

  @get('/tipomascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'Array of Tipomascota has many Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Raza>,
  ): Promise<Raza[]> {
    return this.tipomascotaRepository.razas(id).find(filter);
  }

  @post('/tipomascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'Tipomascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Raza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipomascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {
            title: 'NewRazaInTipomascota',
            exclude: ['id'],
            optional: ['tipomascotaId']
          }),
        },
      },
    }) raza: Omit<Raza, 'id'>,
  ): Promise<Raza> {
    return this.tipomascotaRepository.razas(id).create(raza);
  }

  @patch('/tipomascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'Tipomascota.Raza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {partial: true}),
        },
      },
    })
    raza: Partial<Raza>,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.tipomascotaRepository.razas(id).patch(raza, where);
  }

  @del('/tipomascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'Tipomascota.Raza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.tipomascotaRepository.razas(id).delete(where);
  }
}
