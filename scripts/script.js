$(document).ready(function() {
    /* Recuperando tarefas*/
    database.ref('/tarefas/').orderByChild('id').once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function(child) {
                console.log(child.val(), child.key);
                appendForm(child.key, child.val());
            });
        } else {
            appendForm('', {tarefa: '', id: ''}); //Incluindo campo para adição de nova tarefa;
        }
    });

});

/* Função para apensar campos de tarefas; */
function appendForm(key, registro, afterElement) {
    var form = $('<form onsubmit="return false;"></form>').attr('id', key); //Submit desabilitado
    var tarefaid = $('<input type="text" name="tarefaid">');
    var tarefa = $('<input type="text" name="tarefa" placeholder="Título da tarefa" onchange="submeter(this.form)">')
                    .attr('value', registro.tarefa);
    var delButton = $('<button type="button" onclick="excluir(this.form)">del</button>');
    var addButton = $('<button type="button">add</button>')
                      .on('click', function(){ appendForm('', {tarefa: '', id: ''}, this.form); });

    form.append(tarefaid)
        .append(tarefa)
        .append(delButton)
        .append(addButton);

    if(afterElement){
        $(afterElement).after(form);
    } else {
        $('#forms').append(form);
    }
    
    if(!registro.id) {
        var prevform = $(form).prev();
        var nextform = $(form).next();
        var previd = prevform.length ? parseFloat(prevform[0].tarefaid.value) : 0;
        var nextid = nextform.length ? parseFloat(nextform[0].tarefaid.value) : Number.MAX_VALUE;
        registro.id = (previd / 2 + nextid / 2); //Divisão em duas frações para previnir resultado infinity;
    }
    tarefaid.attr('value', registro.id);
}

function submeter(form) {
    $(form).css({'background-color': 'yellow'});

    /* Se formulário não possui id, receberá como id a chave de seu registro recém gravado;*/
    if(!form.id) {
        form.id = database.ref().child('tarefas').push().key;
    }
    
    var tarefa = { tarefa: form.tarefa.value,
                   id: parseFloat(form.tarefaid.value)};
    var update = {};
    update['/tarefas/' + form.id] = tarefa;

    var promisse = database.ref().update(update);
    promisse.then(okSubmit, erroSubmit);

    function okSubmit(){
        $(form).css({'background-color': 'lightgreen'});
    }

    function erroSubmit() {
        $(form).css({'background-color': 'red'});
    }
}

function excluir(form) {
    $(form).css({'background-color': 'yellow'});

    /* Se houver id, exclui seu registro no banco de dados; */
    if(form.id) { 
        var update = {};
        update['/tarefas/' + form.id] = null;
        var promisse = database.ref().update(update);
        promisse.then(okExclusao, erroExclusao);
    } else {
        $(form).remove();
    }

    function okExclusao(){
        $(form).remove();
    }

    function erroExclusao() {
        $(form).css({'background-color': 'red'});
    }
}