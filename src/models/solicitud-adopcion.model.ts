import {belongsTo, Entity, model, property} from '@loopback/repository';
import {EstadoSolicitud} from './estado-solicitud.model';
import {Mascota} from './mascota.model';
import {Persona} from './persona.model';

@model({
  settings: {
    foreignKeys: {
      fkMascotaSolicitudId: {
        name: 'fkMascotaSolicitudId',
        entity: 'Mascota',
        entityKey: 'id',
        foreignKey: 'mascotaId',
      },
      fkPersonaSolicitudId: {
        name: 'fkPersonaSolicitudId',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fkSolicitudEstadoId: {
        name: 'fkSolicitudEstadoId',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'estadoSolicitudId',
      },
    },
  },
})
export class SolicitudAdopcion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mascota)
  mascotaId: number;

  @belongsTo(() => Persona)
  personaId: number;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: number;

  constructor(data?: Partial<SolicitudAdopcion>) {
    super(data);
  }
}

export interface SolicitudAdopcionRelations {
  // describe navigational properties here
}

export type SolicitudAdopcionWithRelations = SolicitudAdopcion &
  SolicitudAdopcionRelations;
