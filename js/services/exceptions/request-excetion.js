// https://rollbar.com/guides/javascript/how-to-throw-exceptions-in-javascript/

//tratar erro no cep
export default function RequestException(message) {
    const error = new Error(message);
    return error;
  }
  
  RequestException.prototype = Object.create(Error.prototype);