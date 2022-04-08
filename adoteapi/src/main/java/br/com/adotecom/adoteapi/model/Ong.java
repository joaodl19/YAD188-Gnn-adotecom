package br.com.adotecom.adoteapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_ong;
    private String ds_razao_social;
    private String nr_cnpj;
    private String dt_fundacao;
    private String nr_telefone;
    private String nr_cep;
    private String ds_logradouro;
    private String ds_cidade;
    private String ds_obs;
    private String ds_email;
    private String ds_senha;

    public Long getId_ong() {
        return id_ong;
    }

    public void setId_ong(Long id_ong) {
        this.id_ong = id_ong;
    }

    public String getDs_razao_social() {
        return ds_razao_social;
    }

    public void setDs_razao_social(String ds_razao_social) {
        this.ds_razao_social = ds_razao_social;
    }

    public String getNr_cnpj() {
        return nr_cnpj;
    }

    public void setNr_cnpj(String nr_cnpj) {
        this.nr_cnpj = nr_cnpj;
    }

    public String getDt_fundacao() {
        return dt_fundacao;
    }

    public void setDt_fundacao(String dt_fundacao) {
        this.dt_fundacao = dt_fundacao;
    }

    public String getNr_telefone() {
        return nr_telefone;
    }

    public void setNr_telefone(String nr_telefone) {
        this.nr_telefone = nr_telefone;
    }

    public String getNr_cep() {
        return nr_cep;
    }

    public void setNr_cep(String nr_cep) {
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
}
