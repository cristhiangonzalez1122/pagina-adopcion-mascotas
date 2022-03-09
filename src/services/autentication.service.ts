/* eslint-disable @typescript-eslint/no-misused-promises */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Keys} from '../config/keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

const generator = require('password-generator');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

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

  identificarPropietario(usuario: string, clave: string) {
    try {
      const user = this.usuarioRepository.findOne({
        where: {userName: usuario, clave: clave},
      });
      if (user) {
        return user;
      }
      return false;
    } catch {
      return false;
    }
  }

  generateJwt(user: Usuario) {
    const token = jwt.sign(
      {
        data: {
          id: user.id,
          uName: user.userName,
          role: user.rolId,
        },
      },
      Keys.jwtKey,
    );
    return token;
  }

  /**
   * verificar token
   */
  validarToken(token: string) {
    try {
      const decoded = jwt.verify(token, Keys.jwtKey);
      return decoded;
    } catch {
      return false;
    }
  }
}
