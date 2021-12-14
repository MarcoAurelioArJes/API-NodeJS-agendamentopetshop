const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/Tabelas');

const app = customExpress();

conexao.connect((erro) => {
    if (erro) {
        console.error(erro);
    } else {
        
        console.log("Conectado com sucesso!!!");
        Tabelas.init(conexao);

        
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`O servidor está rodando na porta ${PORT}`);
        });
    }
});

