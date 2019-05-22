const axios = require("axios");
const fs = require("fs");

const TOKEN = "dd654ebe4315d7c75af16c3d4fe425b5c317c95d";
const BASE_URL = "https://api.codenation.dev/v1/challenge/dev-ps";

const buscaDesafio = async () => {
  const { data } = await axios.get(`${BASE_URL}/generate-data?token=${TOKEN}`);

  return data;
  //const desafioStringified = JSON.stringify(data, null, 2);
  //fs.writeFileSync("answer.json", desafioStringified);
};

const decifraLetra = (alfabetoArray, caractere) => {
  const posicaoAlfabeto = alfabetoArray.indexOf(caractere);

  //nao eh uma letra do alfabeto especifico
  if (posicaoAlfabeto < 0) {
    return caractere;
  }

  const posicaoDecodificada = posicaoAlfabeto - 8;

  //verifica se sera necessario pegar de forma 'reversa'
  if (posicaoDecodificada >= 0) {
    return alfabetoArray[posicaoDecodificada];
  } else {
    return alfabetoArray[alfabetoArray.length - posicaoDecodificada * -1];
  }
};

const decifra = (string, numeroCasas) => {
  //gerando alfabeto lowercase
  const alfabetoArray = new Array(26)
    .fill(null)
    .map((_, index) => String.fromCharCode(97 + index));

  //gerando array da string convertido para lowercase
  const stringArray = string.toLowerCase().split("");

  const fraseDecifrada = stringArray.reduce((frase, caractere) => {
    return (frase += decifraLetra(alfabetoArray, caractere));
  }, "");

  return fraseDecifrada;
};

const salvaResposta = (desafioCompleto, formatacao = null) => {
  const desafioStringified = JSON.stringify(desafioCompleto, null, formatacao);
  fs.writeFileSync("answer.json", desafioStringified);
};

buscaDesafio().then(desafio => {
  const { cifrado } = desafio;

  desafio.decifrado = decifra(cifrado, 8);

  console.log(desafio);

  //guarda decifrado

  //gerar resumo

  //salvar json
  salvaResposta(desafio, 2);

  //enviar json para api
});
