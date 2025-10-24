import { getApiErrorMessage, getHttpErrorMessage } from './get-error-messages';

export class ErrorMessages {
  static api(code: string) {
    return getApiErrorMessage(code);
  }

  static http(status: string) {
    return getHttpErrorMessage(status);
  }
}
