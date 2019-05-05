$(".container").addClass("container-fluid").removeClass("container")  ; 

function customtoogle(componente){
    seletor = '#'+ componente
    if(!$(seletor).is(':visible')){
          $(seletor).show()
    }else{
        $(seletor).hide()
    }
}

function setResponsive(componente) {
  // origin :  http://pentaho-bi-suite.blogspot.com/2014/09/any-chart-responsive-code-in.html
    var myself = componente;
  // Set initial width to match the placeholder
  myself.chartDefinition.width = myself.placeholder().width();

  // Attach the resize handler only on the first execution of the chart component
  if (!componente.resizeHandlerAttached){

    // Ensure render is only triggered after resize events have stopped
    var debouncedResize = _.debounce(function(){

      // Show chart again.
      myself.placeholder().children().css('visibility','visible');

      // Change chart width
      myself.chartDefinition.width = myself.placeholder().width();
      myself.render( myself.query.lastResults() );
    }, 200);

    // Attach resize handler
    $(window).resize(function(){

      // Only trigger resize if the container has changed width
      if ( myself.chartDefinition.width != myself.placeholder().width()){

        // Temporarily hide chart so that overflow does not happen
        myself.placeholder().children().css('visibility','hidden');

        // Trigger the resize with debounce
        debouncedResize();
      }    
    });

    componente.resizeHandlerAttached = true;
  }
}

function formataBotao(botao, classes, icone){
    componente = $('#'+botao.htmlObject).children().first();
    componente.removeClass('buttonComponent');
    componente.addClass(classes).prepend(icone);
} 

function formataTextComponente(text_componente, classes){
    componente = $('#'+text_componente.htmlObject).children().first();
    componente.addClass(classes);
} 

function formataTextArea(text_area, classes, mensagem){
    componente = $('#'+text_area.htmlObject).children().first();
    componente.addClass(classes).attr({placeholder: mensagem}).empty();
} 

function formataSelect(select, classes){
    componente = $('#'+select.htmlObject).children().first();
    $(componente).addClass(classes); 
} 

function formataTable(table, addclasses, rmclasses, ocultar){
    var tabela = $('#'+table.htmlObject+'Table');
    var cabecalho = $('#'+table.htmlObject+'Table thead');
    var remover = '#'+table.htmlObject+' table '+ocultar;
    cabecalho.addClass(addclasses);
    tabela.removeClass(rmclasses);
    if (!!ocultar) {
        $(remover).hide();
    }
}

function acaoMultiSelect(nivelTodos, parametroValor, parametroReal){
    
    var allMembers = nivelTodos
    var vlr_produtos = Dashboards.getParam(parametroValor)
    var hasAll = Boolean(vlr_produtos.filter(f => f == allMembers).length)
    var arrWithoutAll = vlr_produtos.filter(f => f != allMembers)
    var mdx_param = function (param) { return `{${param}}`}
    
    if(hasAll && vlr_produtos.length > 1){
        Dashboards.fireChange(parametroValor,arrWithoutAll)
        Dashboards.fireChange(parametroReal,mdx_param(arrWithoutAll))
    }else{
        if( vlr_produtos.length == 0 ){
            Dashboards.fireChange(parametroValor,allMembers)
            Dashboards.fireChange(parametroReal,mdx_param(allMembers))
        }else{
            Dashboards.fireChange(parametroValor,arrWithoutAll)
            Dashboards.fireChange(parametroReal,mdx_param(arrWithoutAll))
        }
    }
    
} 

function notifica(divCard, divMensagem, mensagem){
 $(divMensagem).empty();  
 $(divMensagem).prepend(mensagem);
 $(divCard).show();
} 
