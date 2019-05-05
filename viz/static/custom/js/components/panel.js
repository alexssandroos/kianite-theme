Vue.component('panel', {
    template: `
				<div class="card border-primary m-3">
			<div class="card-header pull-left">
			<i v-bind:class="icon"></i>
			 {{ tipo }} | {{ title }}
			</div>
			<div class="card-body">
				<h4 class="card-title" v-text="title" />
				<p class="card-text" v-text="message" />
			</div>
			<div class="card-footer">
				<button class="btn flat btn-primary pull-right" v-on:click="acessaRota()">
				<i class="fa fa-arrow-right"></i>
				</button>
			</div>
			</div>`,
  	data:function(){
		return { clicked:false}
	},
	props: {
		title: String,
		message:String,
		icon:String,
		rota:String,
		tipo:String
	},
	methods: {
		acessaRota(){
			window.location.href=this.rota
		}
  	}
});
