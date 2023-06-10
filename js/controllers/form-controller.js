import Address from "../models/address.js";
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js';

//função State para controlar os inputs e botões da section form do html
function State() {

    //criar construtor p os endereços
    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null; 

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

//instanciar state para receber os dados
const state = new State();

//exporta a função (sícrona) init para iniciar no main (dsviacep)
//sícrona = uma comando de cada vez
export function init() {

    //buscar os atributos dos formularios
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
     
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    //add evento para para controlar
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
   
}

//salvar numero do enderço digitado
function handleInputNumberKeyup(event) {
    state.address.number = event.target.value; 
}

//função sícrona = os dados rodam um por vez
//assícrona = enquanto os dados não chega o sistema continua rodando

//função para chamar cep automatico
async function handleInputCepChange(event) {
    const cep = event.target.value; //obj cep recebe o input do campo cep

    try {
        const address = await addressService.findByCep(cep); //obj address recebe a função no service

        //pega o valor dos dados em address-service para colocar automaticamente nos inputs inativo
        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address; 
    
        setFormError("cep", ""); //para dizer que não tem erro mais
        state.inputNumber.focus(); // focar o numero depois do cep 
    }
    catch (e) {
        setFormError("cep", "Informe um CEP válido"); //se cair no catch mostrar o erro
        //limpar dados
        state.inputCep.value = "";
        state.inputStreet.value = "";
        state.inputNumber.value = "";
        state.inputCity.value = "";
        //depois focar no cep
        state.inputCep.focus();
    }

}

//função para salvar endereço e add card na lista do site
function handleBtnSaveClick(event) {
    event.preventDefault();

    //instancia a função errors no objeto errors
    const errors = addressService.getErrors(state.address);

    //converte a posição dos erros em vetores
    const keys = Object.keys(errors);

    //condição para buscar erro na posição vendo se tem algum valor
    //se tiver, usar função setFormError para sinalizar e avisar
    if (keys.length > 0) {
      keys.forEach(key => {
        setFormError(key, errors[key]);
      });
    }
    //Caso não tenha erros, add card com novo endereço e limpar formulario
    else {
        listController.addCard(state.address);
        handleBtnClearClick(event); //exporta a função para limpar formulario depois de salvar
    }
  
}

//função para tratar number com mensagem de erro se o campo for vazio depois de mudar
function handleInputNumberChange(event) {
    if(event.target.value == "") {
        setFormError("number", "Campo requerido");
    } 
    else {
        setFormError("number", "");
    } 
}

//função para limpar os campos chamados
function handleBtnClearClick(event) {
    event.preventDefault(); //para não abrir outra pagina

    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    state.address = new Address(); //limpar o endereço no Address tbm

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus(); //ao limpar, o campo cep fica em foco para reiniciar o formulario
}

//função para chamar number ou cep que serão tratados em outra função
function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`)
    element.innerHTML = value;
}
