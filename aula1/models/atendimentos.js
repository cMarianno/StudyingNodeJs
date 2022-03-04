const conexao = require('../database/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(jDados, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(jDados.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValida = jDados.cliente.length >= 5

        const validate = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser Maior ou igual a data de criacao'
            },
            {
                nome: 'cliente',
                valido: clienteValida,
                mensagem: 'Cliente deve ter o nome maior que 5 caracteres'
            },
        ]

        const erros = validate.filter(campo => !campo.valido)
        const existErros = erros.length

        if(existErros)
            res.status(400).json(erros)
        else{
            const jData = {...jDados, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, jData,  (erro, resultados) => {
                if(erro)
                    res.status(400).json('Erro')
                else
                    res.status(201).json({...jData})
            })
        }
    }

    listaAll(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }

        })
    }

    lista(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]

            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }

        })
    }

    altera(id, jDados, res){
        if(jDados.data)
            jDados.data =  moment(jDados.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const sql = `UPDATE Atendimentos SET ? WHERE id = ?`

        conexao.query(sql, [jDados, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...jDados, id})
            }
        })
    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id = ?`

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(`O Atendimento do ID ${id} foi Deletado com sucesso!`)
            }
        })
    }
}

module.exports = new Atendimento