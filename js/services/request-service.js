import RequestException from "./exceptions/request-excetion.js";

//função que recebe url de address-service para converter em corpo json
export async function getJson(url) {
    try{
        const response = await fetch(url); //obj response recebe a url
        const jsonBody = await response.json(); //objeto jsonBody recebe a conversão
        return jsonBody;
    }
    //msg caso houver erro na conversão
    catch(e) {
        throw new RequestException("Erro ao realizar requisição") 
    }
    
}

