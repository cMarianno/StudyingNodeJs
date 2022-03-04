const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const { redirect } = require('express/lib/response')
const NaoEncontrado = require('../../erros/NaoEncontrado')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200).send(
        JSON.stringify(resultados)
    )
})

roteador.get('/:idFornecedor', async (req,res) => {
    try {
        const id = parseInt(req.params.idFornecedor)
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        res.status(200).send(
            JSON.stringify(fornecedor)
        )
    }catch(erro){
        res.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.post('/', async (req,res) => {
    try{
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos)
    
        await fornecedor.criar()
        res.status(201).send(
            JSON.stringify(fornecedor)
        )
    }catch(erro){
        res.status(400).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }

    
})

roteador.put('/:idFornecedor', async (req,res) => {
    try{
        const id = parseInt(req.params.idFornecedor)
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
    
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204).end()
    }catch(erro){
        if(erro instanceof NaoEncontrado)
            res.status(404)
        else
            res.status(400)
        res.send(
            JSON.stringify({
                mensagem: erro.message,
                id: erro.idErro
            })
        )
    }
})

roteador.delete('/:idFornecedor', async (req, res) => {
    try{
        const id = parseInt(req.params.idFornecedor)
    
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()
    }catch(erro){
        res.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador