//função State para instanciar a seção section list do html
function State() {
    this.listSection = null;
}

//instanciar state para receber os dados
const state = new State();

//exporta a função (sícrona) init para iniciar no main (dsviacep)
//sícrona = uma comando de cada vez
export function init() {
    //instanciando section list
    state.listSection = document.querySelector("#list-section");
}

//função para add novo card no site
export function addCard(address) {
    const card = createCard(address); //instancia card e recebe dados do endereço
    state.listSection.appendChild(card); //add o filho card dentro da section list
}
//função para criar card e receber os dados dos input do endereço
function createCard(address) {

    //configura card conforme o html, para mostrar no site.
    const div = document.createElement("div"); 
    div.classList.add("card-list-item");

    const h3 = document.createElement("h3");
    h3.innerHTML = address.city;

    const line = document.createElement("p");
    line.classList.add("address-line");
    line.innerHTML = `${address.street}, ${address.number}`;

    const cep = document.createElement("p");
    cep.classList.add("address-cep");
    cep.innerHTML = address.cep;

    //add consts como filho no div
    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep);

    return div;
}