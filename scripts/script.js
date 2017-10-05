$(document).ready(function() {
    appendForm('', ''); //Incluindo campo para adição de nova tarefa;

    /* Recuperando tarefas já salvas; */
    database.ref('/tarefas/').once('value').then(function(snapshot) {
        var tarefas = snapshot.val();
        for(key in tarefas){
            appendForm(key, tarefas[key].tarefa);
        }
    });

});

/* Função para apensar campos de tarefas; */
function appendForm(key, tarefa) {
    var form = $('<form></form>');
    var tarefa = $('<input type="text" name="tarefa" placeholder="Título da tarefa">')
                   .attr('value', tarefa);
    var okButton = $('<button type="button" onclick="submeter(this.form)">ok</button>');
    var delButton = $('<button type="button" onclick="excluir(this.form)">del</button>');
    form.append(tarefa)
        .append(okButton)
        .append(delButton);

    /* Se formulário referencia tarefa existente no banco de dados ele recebe como id sua chave no banco de dados; */
    if(key) {
        form.attr('id', key)
    }

    $('#forms').append(form);
}

function submeter(form) {
    $(form).css({'background-color': 'yellow'});

    /* Se formulário não possui id, receberá como id a chave de seu registro recém gravado;*/
    if(!form.id) {
        form.id = database.ref().child('tarefas').push().key;
    }
    
    var tarefa = { tarefa: form.tarefa.value,};
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