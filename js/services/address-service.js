import * as requestService from './request-service.js';
import Address from '../models/address.js';
import * as formController from '../controllers/form-controller.js';

//função para pegar url e exportar para converter em request-service
export async function findByCep(cep) {

        const url = `https://viacep.com.br/ws/${cep}/json/`; //pegar url
        const result = await requestService.getJson(url); //recebe os dados da url em json

        //obj address recebe o construtor Address com os novos dados do cep
        const address = new Address(result.cep, result.logradouro, null, result.localidade);
        return address;
}

//função para ver se tem erros no cep ou no numero (unicos campos para preencher)
export function getErrors(address) {
        const errors = {};

        if (!address.cep || address.cep == "") {
                errors.cep = "Campo requerido";
        }

        if (!address.number || address.number == "") {
                errors.number = "Campo requerido";
        }

        return errors;
}