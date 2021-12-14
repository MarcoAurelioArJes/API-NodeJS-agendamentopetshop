const conexao = require('../infraestrutura/conexao');

class Servicos {
    criaServico(servico) {
        const sql = 'INSERT INTO SERVICOS SET ?';

        conexao.query(sql, servico, (error, resultados) => {
            if (error) {
                console.log(error);
            } else {
                console.log(resultados);
            }
        });
    };

    listaServico(res) {
        const sql = 'SELECT * FROM SERVICOS';

        conexao.query(sql, (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    };

    listaServicoId(id, res) {
        const sql = `SELECT * FROM SERVICOS WHERE id=${id}`;

        conexao.query(sql, (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados[0]);
            }
        });
    };

    atualizaServico(id, servico, res) {
        const sql = `UPDATE SERVICOS SET ? WHERE ID = ?`;

        conexao.query(sql, [servico, id], (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    };
};

module.exports = new Servicos;