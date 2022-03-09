import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticationService} from '../services';

/**
 * Packcages:
 * npm i @loopback/authentication
 * npm i @loopback/security
 * se debe agregar al archivo application.ts con el siguiente metodo
 * registerAuthenticationStrategy(this, AdministradorStrategy);
    this.component(AuthenticationComponent);
 */

export class PersonaStrategy implements AuthenticationStrategy {
  name = 'persona';

  constructor(
    @service(AutenticationService)
    public servicioAutJWT: AutenticationService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]('no existe un token en la solicitud');
    }
    const info = this.servicioAutJWT.validarToken(token);
    if (info) {
      if (info.data.role === '622434bd6dd4173858d0f034') {
        const perfil: UserProfile = Object.assign({
          id: info.data.id,
          userName: info.data.uName,
          rol: info.data.role,
        });
        return perfil;
      } else {
        throw new HttpErrors[401](
          'El token es valido, pero no tiene los permisos suficientes para ejecutar esta accion',
        );
      }
    } else {
      throw new HttpErrors[401]('El token enviado no es valido');
    }
  }
}
