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
import {HistoriaMedica, Mascota} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaHistoriaMedicaController {
  constructor(
    @repository(MascotaRepository)
    protected mascotaRepository: MascotaRepository,
  ) {}

  @get('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Array of Mascota has many HistoriaMedica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaMedica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaMedica>,
  ): Promise<HistoriaMedica[]> {
    return this.mascotaRepository.historiasMedicas(id).find(filter);
  }

  @post('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(HistoriaMedica)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {
            title: 'NewHistoriaMedicaInMascota',
            exclude: ['id'],
            optional: ['mascotaId'],
          }),
        },
      },
    })
    historiaMedica: Omit<HistoriaMedica, 'id'>,
  ): Promise<HistoriaMedica> {
    return this.mascotaRepository.historiasMedicas(id).create(historiaMedica);
  }

  @patch('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascota.HistoriaMedica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {partial: true}),
        },
      },
    })
    historiaMedica: Partial<HistoriaMedica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaMedica))
    where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.mascotaRepository
      .historiasMedicas(id)
      .patch(historiaMedica, where);
  }

  @del('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascota.HistoriaMedica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaMedica))
    where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.mascotaRepository.historiasMedicas(id).delete(where);
  }
}
