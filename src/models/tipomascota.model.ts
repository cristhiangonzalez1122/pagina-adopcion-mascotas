import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Tipomascota>) {
    super(data);
  }
}

export interface TipomascotaRelations {
  // describe navigational properties here
}

export type TipomascotaWithRelations = Tipomascota & TipomascotaRelations;
