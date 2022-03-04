const Sequelize = require('sequelize')
const instacia = require('../../database')

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categoria: {
        type: Sequelize.ENUM('racao', 'brinquedos'),
        allowNull: true
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instacia.define('fornecedor', colunas, opcoes)