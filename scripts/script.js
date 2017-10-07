$(document).ready(function() {
    /* Recuperando tarefas*/
    database.ref('/tarefas/').orderByChild('id').once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function(child) {
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
    var tarefaid = $('<input type="hidden" name="tarefaid" readonly>');
    var tarefa = $('<input type="text" name="tarefa" placeholder="Título da tarefa" onchange="submeter(this.form)">')
                    .attr('value', registro.tarefa);
    var addButton = $('<button class="btn btn-success" type="button"></button>')
                      .on('click', function(){ appendForm('', {tarefa: '', id: ''}, this.form); })
                      .append('<span class="glyphicon glyphicon-plus"></span>');
    var delButton = $('<button class="btn btn-danger" type="button" onclick="excluir(this.form)"></button>')
                        .append('<span class="glyphicon glyphicon-trash"></span>');

    form.append('<div class="form-group row"></div>').children()
        .append('<div class="col-xs-9"></div>').children()
        .append(tarefaid)
        .append(tarefa).parent()
        //.append('<div class=""></div>').children(':nth-child(2)')
        .append('<span class="glyphicon glyphicon-ok"></span>')
        .append(addButton)//.parent()
        //.append('<div class=""></div>').children(':nth-child(3)')
        .append(delButton)
        .parent();
        //;

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

    form.addClass('container-fluid');//.css({'margin-top': '5px'});
    form.find(':text').addClass('form-control input-sm');
    form.children().children(':button').css({'margin-left': '5px'});
    form.find(':button').addClass('input-sm');
}

function submeter(form) {
    $(form).find('.glyphicon-ok').removeClass('glyphicon-ok').addClass('glyphicon-refresh');

    $.post('./tokenVerify.php', { token: $('#token').text(), }, function(data, status, xhr) {
        if(data && xhr.readyState == 4 && xhr.status == 200) {
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
        } else {
            erroSubmit();
        }
    });

    function okSubmit(){
        $(form).find('.glyphicon-refresh').removeClass('glyphicon-refresh').addClass('glyphicon-ok');
    }

    function erroSubmit() {
        $(form).find('.glyphicon-refresh').removeClass('glyphicon-refresh').addClass('glyphicon-alert');
    }
}

function excluir(form) {
    $(form).find('.glyphicon-ok').removeClass('glyphicon-ok').addClass('glyphicon-refresh');

    $.post('./tokenVerify.php', { token: $('#token').text(), }, function(data, status, xhr) {
        if(data && xhr.readyState == 4 && xhr.status == 200) {
            /* Se houver id, exclui seu registro no banco de dados; */
            if(form.id) { 
                var update = {};
                update['/tarefas/' + form.id] = null;
                var promisse = database.ref().update(update);
                promisse.then(okExclusao, erroExclusao);
            } else {
                $(form).remove();
                if($('#forms').children().length === 0) {
                    appendForm('', {tarefa: '', id: ''}); //Incluindo campo para adição de nova tarefa;
                }
            }
        } else {
            erroExclusao();
        }
    });

    function okExclusao(){
        $(form).remove();
        if($('#forms').children().length === 0) {
            appendForm('', {tarefa: '', id: ''}); //Incluindo campo para adição de nova tarefa;
        }
    }

    function erroExclusao() {
        $(form).find('.glyphicon-refresh').removeClass('glyphicon-refresh').addClass('glyphicon-alert');
    }
}