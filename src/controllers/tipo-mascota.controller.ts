import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Tipomascota} from '../models';
import {TipomascotaRepository} from '../repositories';

export class TipoMascotaController {
  constructor(
    @repository(TipomascotaRepository)
    public tipomascotaRepository: TipomascotaRepository,
  ) {}

  @post('/tipo-mascotas')
  @response(200, {
    description: 'Tipomascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipomascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipomascota, {
            title: 'NewTipomascota',
            exclude: ['id'],
          }),
        },
      },
    })
    tipomascota: Omit<Tipomascota, 'id'>,
  ): Promise<Tipomascota> {
    return this.tipomascotaRepository.create(tipomascota);
  }

  @get('/tipomascotas/count')
  @response(200, {
    description: 'Tipomascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipomascota) where?: Where<Tipomascota>,
  ): Promise<Count> {
    return this.tipomascotaRepository.count(where);
  }

  @get('/tipo-mascotas')
  @response(200, {
    description: 'Array of Tipomascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipomascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipomascota) filter?: Filter<Tipomascota>,
  ): Promise<Tipomascota[]> {
    return this.tipomascotaRepository.find(filter);
  }

  @patch('/tipo-mascotas')
  @response(200, {
    description: 'Tipomascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipomascota, {partial: true}),
        },
      },
    })
    tipomascota: Tipomascota,
    @param.where(Tipomascota) where?: Where<Tipomascota>,
  ): Promise<Count> {
    return this.tipomascotaRepository.updateAll(tipomascota, where);
  }

  @get('/tipo-mascotas/{id}')
  @response(200, {
    description: 'Tipomascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipomascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tipomascota, {exclude: 'where'})
    filter?: FilterExcludingWhere<Tipomascota>,
  ): Promise<Tipomascota> {
    return this.tipomascotaRepository.findById(id, filter);
  }

  @patch('/tipo-mascotas/{id}')
  @response(204, {
    description: 'Tipomascota PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipomascota, {partial: true}),
        },
      },
    })
    tipomascota: Tipomascota,
  ): Promise<void> {
    await this.tipomascotaRepository.updateById(id, tipomascota);
  }

  @put('/tipo-mascotas/{id}')
  @response(204, {
    description: 'Tipomascota PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipomascota: Tipomascota,
  ): Promise<void> {
    await this.tipomascotaRepository.replaceById(id, tipomascota);
  }

  @del('/tipo-mascotas/{id}')
  @response(204, {
    description: 'Tipomascota DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipomascotaRepository.deleteById(id);
  }
}
