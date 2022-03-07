import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
const CryptoJS = require('crypto-js');

/* eslint-disable @typescript-eslint/naming-convention */
@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFunctionsServices {
  constructor() {}

  /**
   * otro metodo de cifrar la clave con criptoJS
   */

  EncryptPassword(text: string): string {
    const ciphertext = CryptoJS.AES.encrypt(text, Keys.AESkey).toString();
    return ciphertext;
  }
}
