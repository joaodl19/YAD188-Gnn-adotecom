var app = new Vue({
    el: '#app',
    data: {
      nome: '',
      razaoSocial: '',
      cpf: '',
      nascimento: '',
      sexo: '',
      telefone: '',
      email: '',
      cep: '',
      logradouro:'',
      cidade:  '',
      estado:  '',
      bairro: '',
      estado_civil: ''
    },
    methods: {
        cadastraCliente: function(){
            axios
            .post('http://localhost:8080/cliente',{
                ds_nome: this.nome,
                nr_cpf_cnpj: this.cpf,
                dt_nascimento_fundacao: this.nascimento,
                ds_genero: this.sexo,
                nr_telefone:11971497088,
                nr_cep: string(this.cep),
                ds_cidade: this.cidade,
                ds_logradouro: this.logradouro,
                ds_deficiencia:false,
                ds_obs: "Observaçao",
                ds_email: this.email,
                ds_senha:"123456",
                tx_foto:"foto"  
            })
        },
        cadastraOng: function(){
            axios
            .post('http://localhost:8080/ong',{
                ds_razao_social: this.razaoSocial,
                nr_cnpj: this.cnpj,
                dt_fundacao: this.dtFundacao,
                nr_telefone: this.telefone,
                nr_cep: this.cep,
                ds_logradouro: this.logradouro,
                ds_cidade: this.cidade,
                ds_obs: this.descricao,
                ds_email: this.email,
                ds_senha: this.senha
            })
        },
        pesquisaCep: function (){
            axios
            .get('https://viacep.com.br/ws/' + this.cep + '/json')
            .then(response => {
                this.logradouro = response.data.logradouro,
                this.cidade = response.data.localidade,
                this.bairro = response.data.bairro,
                this.estado = response.data.uf
            })
 
        }
    }

})
  