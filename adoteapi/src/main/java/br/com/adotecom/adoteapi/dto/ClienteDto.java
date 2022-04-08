package br.com.adotecom.adoteapi.dto;

import br.com.adotecom.adoteapi.model.Cliente;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class ClienteDto {

    private String ds_nome;
    private String nr_cpf_cnpj;
    private String dt_nascimento_fundacao;
    private String ds_genero;
    private Long nr_telefone;
    private Long nr_cep;
    private String ds_logradouro;
    private String ds_cidade;
    private Boolean ds_deficiencia;
    private String ds_obs;
    private String ds_email;
    private String ds_senha;
    private String tx_foto;



    public String getDs_nome() {
        return ds_nome;
    }

    public void setDs_nome(String ds_nome) {
        this.ds_nome = ds_nome;
    }

    public String getNr_cpf_cnpj() {
        return nr_cpf_cnpj;
    }

    public void setNr_cpf_cnpj(String nr_cpf_cnpj) {
        this.nr_cpf_cnpj = nr_cpf_cnpj;
    }

    public String getDt_nascimento_fundacao() {
        return dt_nascimento_fundacao;
    }

    public void setDt_nascimento_fundacao(String dt_nascimento_fundacao) {
        this.dt_nascimento_fundacao = dt_nascimento_fundacao;
    }

    public String getDs_genero() {
        return ds_genero;
    }

    public void setDs_genero(String ds_genero) {
        this.ds_genero = ds_genero;
    }

    public Long getNr_telefone() {
        return nr_telefone;
    }

    public void setNr_telefone(Long ds_telefone) {
        this.nr_telefone = ds_telefone;
    }

    public Long getNr_cep() {
        return nr_cep;
    }

    public void setNr_cep(Long nr_cep) {
        this.nr_cep = nr_cep;
    }

    public String getDs_logradouro() {
        return ds_logradouro;
    }

    public void setDs_logradouro(String ds_logradouro) {
        this.ds_logradouro = ds_logradouro;
    }

    public String getDs_cidade() {
        return ds_cidade;
    }

    public void setDs_cidade(String ds_cidade) {
        this.ds_cidade = ds_cidade;
    }

    public Boolean getDs_deficiencia() {
        return ds_deficiencia;
    }

    public void setDs_deficiencia(Boolean ds_deficiencia) {
        this.ds_deficiencia = ds_deficiencia;
    }

    public String getDs_obs() {
        return ds_obs;
    }

    public void setDs_obs(String ds_obs) {
        this.ds_obs = ds_obs;
    }

    public String getDs_email() {
        return ds_email;
    }

    public void setDs_email(String ds_email) {
        this.ds_email = ds_email;
    }

    public String getDs_senha() {
        return ds_senha;
    }

    public void setDs_senha(String ds_senha) {
        this.ds_senha = ds_senha;
    }

    public String getTx_foto() {
        return tx_foto;
    }

    public void setTx_foto(String tx_foto) {
        this.tx_foto = tx_foto;
    }

    public static ClienteDto toClienteRetornado(Cliente cliente){

        ClienteDto novo_cliente = new ClienteDto();
        novo_cliente.setDs_nome(cliente.getDs_nome());
        novo_cliente.setDs_cidade(cliente.getDs_cidade());
        novo_cliente.setDs_deficiencia(cliente.getDs_deficiencia());
        novo_cliente.setDs_genero(cliente.getDs_genero());
        novo_cliente.setDs_logradouro(cliente.getDs_logradouro());
        novo_cliente.setNr_telefone(cliente.getNr_telefone());
        novo_cliente.setDs_email(cliente.getDs_email());
        novo_cliente.setDs_obs(cliente.getDs_obs());
        novo_cliente.setDt_nascimento_fundacao(cliente.getDt_nascimento_fundacao().toString());
        novo_cliente.setNr_cep(cliente.getNr_cep());
        novo_cliente.setDs_senha(cliente.getDs_senha());
        novo_cliente.setTx_foto(cliente.getTx_foto());
        novo_cliente.setNr_cpf_cnpj(cliente.getNr_cpf_cnpj());
        return  novo_cliente;
    }

    public static Cliente toCliente(ClienteDto cliente) throws ParseException {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
        Cliente novo_cliente = new Cliente();
        novo_cliente.setDs_nome(cliente.getDs_nome());
        novo_cliente.setDs_cidade(cliente.getDs_cidade());
        novo_cliente.setDs_deficiencia(cliente.getDs_deficiencia());
        novo_cliente.setDs_genero(cliente.getDs_genero());
        novo_cliente.setDs_logradouro(cliente.getDs_logradouro());
        novo_cliente.setNr_telefone(cliente.getNr_telefone());
        novo_cliente.setDs_email(cliente.getDs_email());
        novo_cliente.setDs_obs(cliente.getDs_obs());
        novo_cliente.setDt_nascimento_fundacao(formato.parse(cliente.getDt_nascimento_fundacao()));
        novo_cliente.setNr_cep(cliente.getNr_cep());
        novo_cliente.setDs_senha(cliente.getDs_senha());
        novo_cliente.setTx_foto(cliente.getTx_foto());
        novo_cliente.setNr_cpf_cnpj(cliente.getNr_cpf_cnpj());
        return novo_cliente;
    }

}
