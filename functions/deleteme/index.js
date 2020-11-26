var XMLHttpRequest = require('xhr2');
var parseString = require('xml2js').parseString;

const http = new XMLHttpRequest();
http.open('GET', 'http://nfce.sefaz.pe.gov.br/nfce-web/consultarNFCe?p=26200675315333022854655120000776561048579178|2|1|1|55FA90FCFF5BD9F69893C0AF455E832B647BFBF3');
http.setRequestHeader('Accept', 'application/xml');
http.send();


http.onreadystatechange = (e) => {
  if(http.responseText !== '') {
    parseString(http.responseText, function (err, result) {
      console.dir(result);
      // data de emissao
      // cnpj da loja
      // nome da loja
      // rua da loja
      // nro da loja
      // bairro da loja
      // para cada produto:
      //    cEAN
      //    descrição
      //    valor unitário
      //    qtd comprada
      const root = result.nfeProc.proc[0].nfeProc[0].NFe[0].infNFe[0];
      const dtEmissao = root.ide[0].dhEmi;
      const dadosLoja = root.emit[0];

      console.dir(result.nfeProc.proc[0].nfeProc[0].NFe[0].infNFe[0].emit[0]);
    });
  }
}