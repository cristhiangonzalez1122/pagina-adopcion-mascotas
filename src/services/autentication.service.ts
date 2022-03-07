import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';

const generator = require('password-generator');
const CryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  /*
   * Add service methods here
   */
  generarClave() {
    const password = generator(10, false);
    return password;
  }

  cifrarClave(clave: string) {
    const claveCifrada = CryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
