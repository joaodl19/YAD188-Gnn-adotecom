package br.com.adotecom.adoteapi.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id_cliente;
    private String ds_nome;
    private String nr_cpf_cnpj;
    private Date dt_nascimento_fundacao;
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

    public Long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }

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

    public Date getDt_nascimento_fundacao() {
        return dt_nascimento_fundacao;
    }

    public void setDt_nascimento_fundacao(Date dt_nascimento_fundacao) {
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

    public void setNr_telefone(Long nr_telefone) {
        this.nr_telefone = nr_telefone;
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


}
