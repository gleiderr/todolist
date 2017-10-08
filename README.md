# To-do list
Aplicação To-do List para processo seletivo.

## Arquitetura
Considerando as decisões tecnológicas, foram escolhidas as seguintes ferramentas:
- Javascript: escolhido devido à sua abrangência e simplicidade para manipulação front-end e interface com back-end;
- Firebase: escolhido este Banco de Dados Não Relacional como desafio pessoal para aprendizado de nova tecnologia ainda não presente no currículo;
- Bootstrap: escolhido este framework como biblioteca de estilos devido à sua popularidade de mercado;
- jQuery: escolhido este framework javascript tanto devido à sua popularidade, quanto à sua simplicidade para manipulação de conteúdo HTML;
- HTML: escolhido como estruturador de conteúdo básico;
- PHP: como todas a manipulações no firebase podem ser feitas diretamente via javascript, sem código back-end, pouco foi desenvolvido nesta linguagem. Porém, para demonstrar algum conhecimento nela, foi desenvolvido algum código em PHP;

Considerando a estrutura lógica da aplicação, segue breve descrição a partir dos arquivos:
- index.php: armazena basicamente a estrutura inicial do aplicativo e as referêcias às bibliotecas de estilos, banco de dados e frameworks;  
  - Os componentes div#token armazena o token para validadação da página. Validação definida para o arquivo, pois qualquer manipulação maliciosa se daria no arquivo e não em cada formulário.
- token.php: armazena duas funções PHP que geram e verificam a validade de determinado token;
- tokenVerify.php: responsável pela resposta de uma requisição AJAX feita para validação da página principal da aplicação;
- script.js: responsável por maior parte da lógica da aplicação, será dedicada abaixo seção que irá descrevê-lo melhor.

### script.js
Após o completo carregamento da página, este script realiza uma consulta (query) ao Firebase buscando por registros de tarefas previamente armazenadas. Caso e nenhuma tarefa seja encontrada uma primeira linha é disponibilizada para inclusão da primeira tarefa.

#### Estrutura da tarefa
Cada tarefa possui unicamente seu título e um identificador "ordinal" de ponto flutuante. Este identificador é responsável por garantir que cada tarefa mantenha-se na ordem em que foi gravada pelo usuário. Preferi não entrar no mérito do significado dado pelo usuário quanto à ordem em que ele define as tarefas. O que poderia significar 'ordem prioridade', 'ordem cronológica', 'ordem topológica', 'ordem de custos', etc. O ponto flutuante, neste caso apresenta quantidade suficiente de índices para armazenar tarefas.

Optei pela simplicidade ao apresentar apenas um campo textual como informação semântica de cada tarefa.



