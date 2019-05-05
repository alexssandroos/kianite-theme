<template>
<v-app>
<div id="app" class="pa-2" style="position:relative;top:55px;">
    <v-toolbar app flat dark color="light-blue" class="mb-1">
       <v-toolbar-title class="headline text-uppercase mr-4">
           <span>SEI</span>
       </v-toolbar-title>

       <v-toolbar-items left>
           <v-btn v-for="tr in tipo_recurso" :key="tr" flat v-text="tr"  v-on:click="filtraLista(tr)"/>
       </v-toolbar-items>

       <v-spacer></v-spacer>
      
       <v-toolbar-items right>
         <v-text-field prepend-icon="search"
                v-model="searchText"
                flat hide-details single-line></v-text-field>
           <v-btn flat v-on:click="resetaLista()">
             <v-icon>refresh</v-icon>
           </v-btn>  
       </v-toolbar-items>
    </v-toolbar>

<v-spacer></v-spacer>

    <v-alert :value="true" v-for="aviso in avisos" :key="aviso['id']" :color="aviso['tipo']" :type="aviso['tipo']" dismissible>
      <h3> {{ aviso['titulo']}}</h3>
      <p> {{ aviso['descricao']}}</p>      
    </v-alert>

    <v-alert
        :value="true"
        type="info"
        v-if="!recursos.length"
         class="text-uppercase"
      >
        Olá {{contexto.user}} não há recursos cadastrados para você, quaisquer dúvidas contatar o administrador.
      </v-alert>

  <div class="ma-5">
    <v-card  v-for="rec in recurso_f" :key="rec['id']" class="pa-2 ma-2">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            <v-icon left>{{rec['icone']}}</v-icon>
            {{  rec['nome'] }}
          </h3>
          <div v-text="rec['descricao']" />
        </div>
      </v-card-title>
      <v-card-actions>
            <v-btn flat color="light-blue" 
                  v-on:click="abreArquivo(rec['nome'], rec['descricao'], rec['link'])">
                  Abrir
              <v-icon right>open_in_new</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-chip color="light-blue" text-color="white" left>
              </v-avatar>
                  <v-icon>label</v-icon>
              </v-avatar>
              {{ rec['modulo_dsc'] }}
            </v-chip>

      </v-card-actions>
    </v-card>
  </div>

</div>
</v-app>
</template>

<script>
export default {
  name: 'app',
  data()  {
          return {
             tipo_recurso: [],
             recursos : [],
             recurso_filtrado : [],
             contexto : [],
             avisos : [],
             searchText: ''
          }
        },
     beforeMount() {
       this.$pentaho('plugin/pentaho-cdf/api/cdf-embed.js').then(r => this.contexto = this.parseCDF(r.data))
        this.$api('getrecurso').then(response => {
                    let res = response.data.resultset
                    let recursos = res.map(i => this.parseRecurso(i))
                    let roles = this.contexto.roles
                    this.recursos = recursos.filter(recurso => recurso.roles.split(', ').some(r => roles.includes(r)))
                    this.tipo_recurso = Array.from(new Set(this.recursos.map(r => r.tipo)))
                    this.recurso_filtrado = this.recursos
              })
         this.$api('getaviso').then(response => {
                    let res = response.data.resultset
                    let roles =  this.contexto.roles
                    let avisos = res.map(i => this.parseAviso(i))
                    this.avisos = avisos.filter(recurso => recurso.roles.split(', ').some(r => roles.includes(r)))
              })      

        },
        methods :{
          filtraLista(tipo) {
            this.recurso_filtrado = this.recursos.filter((recurso)=>{ return recurso.tipo === tipo })
          },
          resetaLista() {
            this.recurso_filtrado = this.recursos
          },
          parseCDF(responseData){
            console.log(responseData)
            let contexto =  responseData.split(';')[1]
                      .split('=')[1]
                      .replace(',\nstorage: {}','')
                      .replace(/(\r\n|\n|\r)/gm," ")
                      .split('xt:')[1]
                      .replace('} }', '}')
            return JSON.parse(contexto)
          }, 
          parseAviso(responseAviso){
            return {
              'id' : responseAviso[0],
              'titulo' :responseAviso[1],
              'descricao' : responseAviso[2],
              'roles' : responseAviso[4],
              'tipo' : responseAviso[7]
          }
          }
          ,
          parseRecurso(array){
            return {
              'tipo' : array[9],
              'nome' : array[2],
              'descricao' : array[3],
              'status' : array[4],
              'link' : array[5],
              'modulo' : array[6],
              'cubo' : array[7],
              'roles' : array[8],
              'id': array[0],
              'tipoid': array[1],
              'icone': array[10],
              'cubo_dsc': array[11],
              'modulo_dsc': array[12]
            }
        },
        abreArquivo(nomeArquivo, tooltip, fullpath){
          let context = window.top
          context.mantle_setPerspective('opened.perspective')
          context.openURL(nomeArquivo, tooltip, fullpath)
        }
        },
        computed:{
          recurso_f(){
            const str = this.searchText.toLowerCase();
            if (!str) { return this.recurso_filtrado; }

            return this.recursos.filter((recurso)=>{ return Boolean( recurso.nome.toLowerCase().match(str)) })
        
          }
        }

}
</script>
