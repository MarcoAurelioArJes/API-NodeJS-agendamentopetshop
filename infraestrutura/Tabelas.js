class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        // Chamando a funcao para ser inicializada quando o codigo for rodado
        this.criarTabelaAtendimentos();

        this.criarTabelaDeServico();
    };

    criarTabelaDeServico() {
        const sql = `
                CREATE TABLE IF NOT EXISTS SERVICOS (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                NOME VARCHAR(30) NOT NULL,
                PRECO FLOAT(5,2) NOT NULL
        )`;

        this.conexao.query(sql, error => {
            if (error) {
                console.log(error);
            } else {
                console.log('Tabela criada com sucesso!!!');
            }
        });
    }

    criarTabelaAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ATENDIMENTOS (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                NOMECLIENTE VARCHAR(50) NOT NULL,
                PET VARCHAR(20) NOT NULL,
                SERVICO VARCHAR(20) NOT NULL,
                STATUS VARCHAR(20) NOT NULL,
                OBSERVACOES TEXT,
                IDSERV INT,
                FOREIGN KEY (IDSERV) REFERENCES SERVICOS(ID))`;

        this.conexao.query(sql, error => {
            if (error) {
                console.log(error);
            } else {
                console.log("Tabelas criadas com sucesso!!!");
            }
        });
    };
};

module.exports = new Tabelas;