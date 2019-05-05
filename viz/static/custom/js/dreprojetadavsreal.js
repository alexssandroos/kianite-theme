function TBL_EXPANDED_NVL2(tabela){
    var cd = tabela.chartDefinition;
    var main = tabela;

    var main_options = {
        listeners: [
            "PRM_PRODUTO", 
            "PRM_ANO",
            "PRM_CENTRO_CUSTO",
            "PRM_DRE_NVL01"
        ],
        parameters: [
            ["PRM_PRODUTO","PRM_PRODUTO"],
            ["PRM_ANO", "PRM_ANO"],
            ["PRM_CENTRO_CUSTO", "PRM_CENTRO_CUSTO"],
            ["PRM_DRE_NVL01", "PRM_DRE_NVL01"]
        ],
        postExecution: function(){
            formataTable(tabela, "table-info" ,"form-inline table-responsive sorting", null);    
        }
    }

    var cd_options = {
        colHeaders: ['GRUPO 2 ', 'R$ Saldo', 'R$ Meta', 'Var %', 'Var % Periodo'],
        colFormats: [ null, '%11.2f', '%11.2f','%03.2f%%', '%03.2f%%' ],
        clickAction: function(e){
            var p1 = e.tableData[e.rowIdx][0]
            var mdx =  `${Dashboards.getParam('PRM_DRE_NVL01')}.[${p1}]`
            var param = Dashboards.getParam('PRM_DRE_NVL02')
            
            if(mdx!=param){
                Dashboards.fireChange('PRM_DRE_NVL02', mdx)
            }
        }
    }

    $.extend(true, cd, cd_options);
    $.extend(true, main, main_options);   
}

function TBL_EXPANDED_NVL3(tabela) {
    var cd = tabela.chartDefinition;
    var main = tabela;

    var main_options = {
        listeners: [
                "PRM_PRODUTO", 
                "PRM_ANO",
                "PRM_CENTRO_CUSTO",
                "PRM_DRE_NVL02"
        ],
        parameters: [
                ["PRM_PRODUTO","PRM_PRODUTO"],
                ["PRM_ANO", "PRM_ANO"],
                ["PRM_CENTRO_CUSTO", "PRM_CENTRO_CUSTO"],
                ["PRM_DRE_NVL02", "PRM_DRE_NVL02"]
        ],
        postExecution: function(){
            formataTable(tabela, "table-success" ,"form-inline table-responsive sorting", null);    
        }
    }

    var cd_options = {
        colHeaders: ['GRUPO 3 ', 'R$ Saldo', 'R$ Meta', 'Var %', 'Var % Periodo'],
        colFormats: [ null, '%11.2f', '%11.2f','%03.2f%%', '%03.2f%%' ]
    }

    $.extend(true, cd, cd_options);
    $.extend(true, main, main_options);

} 

function TBL_DRE_N1(tabela){
    var main = tabela;
    var cd = main.chartDefinition;

    var main_options = {
        listeners: [
                "PRM_PRODUTO", 
                "PRM_ANO",
                "PRM_CENTRO_CUSTO"
        ],
        parameters: [
                ["PRM_PRODUTO","PRM_PRODUTO"],
                ["PRM_ANO", "PRM_ANO"],
                ["PRM_CENTRO_CUSTO", "PRM_CENTRO_CUSTO"]
        ],
        postExecution: function(){
            formataTable(main, "table-primary" ,"form-inline table-responsive sorting", null);    
        }
    };
        
    var cd_options = {
        colHeaders: ['GRUPO', 'R$ Saldo', 'R$ Meta', 'Var %', 'Var % Periodo'],
        colFormats: [ null, '%11.2f', '%11.2f','%03.2f%%', '%03.2f%%' ],
        clickAction: function(e){
            var p1 = e.tableData[e.rowIdx][0]
            var mdx = `[DIM_EGC_ESTRUTURA_GRUPO_CONTAS].[013].[${p1}]`
            var param =  Dashboards.getParam('PRM_DRE_NVL01')
            
            if (param!=mdx){
                Dashboards.fireChange('PRM_DRE_NVL01', mdx)
            }
        } 
    };

    $.extend(true, cd, cd_options);
    $.extend(true, main, main_options);

}