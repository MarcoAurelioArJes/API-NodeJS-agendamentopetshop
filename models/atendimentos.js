const moment = require('moment');

const conexao = require('../infraestrutura/conexao');

class Atendimento {

    adiciona(atendimento, res) {
        const datacriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss');

        const clienteValido = atendimento.nomecliente.length >= 3;
        const dataValida = moment(datacriacao).isSameOrAfter(data);

        const validacoes = [
            {
                nome: 'data inválida',
                valida: dataValida,
                info: 'A data informada deve ser maior que a data atual'
            },
            {
                nome: 'nome inválido',
                valida: clienteValido,
                info: 'O nome do cliente deve ter mais de 3 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valida);

        console.log(erros);
        const existeErro = erros.length;
        console.log(existeErro);
        if (existeErro > 0) {
            res.status(400).json(erros);
        } else {
            const criacaoAtendimentos = {...atendimento, data, datacriacao};
            
            const sql = "INSERT INTO Atendimentos SET ?"
                            //Valores 
            conexao.query(sql, criacaoAtendimentos, (error, resultado) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json(atendimento);
                }
            });
        }
    };

    listaAtendimentos(res) {
        const sql = 'SELECT * FROM ATENDIMENTOS';

        conexao.query(sql, (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    };

    listaPorId(id, res) {
        const sql = `SELECT * FROM ATENDIMENTOS WHERE id = ${id}`;

        conexao.query(sql, res, (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    };

    altera(id, valores, res) {
        const sql = `UPDATE Atendimentos SET ? WHERE id = ?`;

        if (valores.data) {
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss');
        };
        console.log([valores, id]);
        conexao.query(sql, [valores, id], (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    };

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        conexao.query(sql, id, (error, resultados) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        });
    };
};

module.exports = new Atendimento;