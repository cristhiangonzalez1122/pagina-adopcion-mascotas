import {Entity, model, property, hasMany} from '@loopback/repository';
import {Raza} from './raza.model';

@model()
export class Tipomascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Raza)
  razas: Raza[];

  constructor(data?: Partial<Tipomascota>) {
    super(data);
  }
}

export interface TipomascotaRelations {
  // describe navigational properties here
}

export type TipomascotaWithRelations = Tipomascota & TipomascotaRelations;
