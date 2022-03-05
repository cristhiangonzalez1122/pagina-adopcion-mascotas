import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Tipomascota} from './tipomascota.model';

@model({
  settings: {
    foreignKeys: {
      fkMascotaTipoId: {
        name: 'fkMascotaTipoId',
        entity: 'Tipomascota',
        entityKey: 'id',
        foreignKey: 'tipomascotaId',
      },
    },
  },
})
export class Raza extends Entity {
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

  @belongsTo(() => Tipomascota)
  tipomascotaId: number;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
