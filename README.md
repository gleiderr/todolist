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

### Comandos para o usuário
Nesta aplicação as operaçes de Criação, Recuperação, Atualização e Exclusão são realizadas por apenas um campo de texto e dois botões. 
- A criação de novas tarefas é realizada via botão '+' e a edição do campo da nova tarefa;
- A Recuperação é realizada automaticamente ao abrir a página da aplicação;
- A atualização é realizado tão somente pela modificação do campo correspondente;
- E a exclusão é realizada via botão 'lixeira'.

Cada uma destas operações é realizada de forma assíncrona e seu sucesso, andamento e eventual erro de gravação são sinalizados para o usuário via ícones de "check", "updating" e "atention", respectivamente.

### Pseudo-verificação de segurança
À cada gravação no banco de dados são realizadas chamadas AJAX via jQuery para validação de um token gerado pelo servidor PHP. Este token é armazenado na sessão de cada usuário conectado ao servidor e enviado para o servidor para que este valide que o formulário foi gerado pelo servidor sendo acessado.

Reconheço que há falhas de segurança neste algoritmo, mas foi desenvolvido para apresentar algum código PHP para esta aplicação.

## Conclusão
O desenvolvimento desta aplicação expôs um pouco da minha lógica e do meu conhecimento nas ferramentas supracitadas, além de demonstrou minha capacidade de aprender novas tecnologias, visto que aprendi Firebase para nesta aplicação.

Juntamente com isso, foi gratificando desenvolver esta simples aplicação.

Obrigado aos avaliadores pela oportunidade.
