const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
    //req = resposta da requisição
    //res = resposta para requisição
    app.get('/agendamentos', (req, res) => {
        Atendimento.listaAtendimentos(res);
    });
    
    app.get('/agendamentos/:id', (req, res) => {
        const id = Number(req.params.id);

        Atendimento.listaPorId(id,res);
    });

    app.post('/agendamentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);
    });


    // Utilizamos o patch para ficar mais semântico para o padrão REST
    // porém poderiamos usar um POST, passando, 'edit/agendamentos/:id'
    app.patch('/agendamentos/:id', (req, res) => {
        const atendimento = req.body;
        const id = Number(req.params.id);

        Atendimento.altera(id, atendimento, res);
    });

    // Utilizamos o delete para ficar mais semântico para o padrão REST
    // porém poderiamos usar um POST, passando, 'delete/agendamentos/:id'
    app.delete('/agendamentos/:id', (req, res) => {
        const id = Number(req.params.id);

        Atendimento.deleta(id, res);
    });
}