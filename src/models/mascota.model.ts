import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {HistoriaMedica} from './historia-medica.model';
import {Raza} from './raza.model';
import {SolicitudAdopcion} from './solicitud-adopcion.model';
import {VacunaMascota} from './vacuna-mascota.model';
import {Vacuna} from './vacuna.model';

@model({
  settings: {
    foreignKeys: {
      fkRazaId: {
        name: 'fkRazaId',
        entity: 'Raza',
        entityKey: 'id',
        foreignKey: 'razaId',
      },
      fkCiudadMascotaId: {
        name: 'fkCiudadMascotaId',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Mascota extends Entity {
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
  identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
  })
  FechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Raza)
  razaId: number;

  @hasMany(() => HistoriaMedica)
  historiasMedicas: HistoriaMedica[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => SolicitudAdopcion)
  solicitudesdeadopcion: SolicitudAdopcion[];

  @hasMany(() => Vacuna, {through: {model: () => VacunaMascota}})
  vacunas: Vacuna[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
