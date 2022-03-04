const ModelaTabela = require ('../routes/fornecedores/modeloTabelaFornecedores.js')

ModelaTabela
    .sync()
    .then(() => console.log('Tabela Criada com sucesso!'))
    .catch(console.log)