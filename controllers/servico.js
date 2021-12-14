const Servicos = require('../models/servicos');

module.exports = app => {

    app.get('/servicos', (req, res) => {
       Servicos.listaServico(res);
    });

    app.get('/servicos/:id', (req, res) => {
        const id = Number(req.params.id)
        Servicos.listaServicoId(id, res);
    });

    app.post('/servicos', (req, res) => {
        const servicos = req.body;

        Servicos.criaServico(servicos);
        console.log(servicos);

        res.send('Voce esta na pagina servicos fazendo uma requisicao do tipo POST');
    })

    app.patch('/servicos/:id', (req, res) => {
        const id = Number(req.params.id);
        const servico = req.body;
        Servicos.atualizaServico(id, servico,res);
    });
};