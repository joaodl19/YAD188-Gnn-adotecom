package br.com.adotecom.adoteapi.model;

import jdk.nashorn.internal.runtime.regexp.joni.ast.StringNode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pet;
    private String ds_nome;
    private String dt_nascimento;
    private String ds_raca;
    private String ds_genero;
    private Long id_ong;
    private String ds_status;
    private String ds_obs;
    private String tx_foto;

    public Long getId_pet() {
        return id_pet;
    }

    public void setId_pet(Long id_pet) {
        this.id_pet = id_pet;
    }

    public String getDs_nome() {
        return ds_nome;
    }

    public void setDs_nome(String ds_nome) {
        this.ds_nome = ds_nome;
    }

    public String getDt_nascimento() {
        return dt_nascimento;
    }

    public void setDt_nascimento(String dt_nascimento) {
        this.dt_nascimento = dt_nascimento;
    }

    public String getDs_raca() {
        return ds_raca;
    }

    public void setDs_raca(String ds_raca) {
        this.ds_raca = ds_raca;
    }

    public String getDs_genero() {
        return ds_genero;
    }

    public void setDs_genero(String ds_genero) {
        this.ds_genero = ds_genero;
    }

    public Long getId_ong() {
        return id_ong;
    }

    public void setId_ong(Long id_ong) {
        this.id_ong = id_ong;
    }

    public String getDs_status() {
        return ds_status;
    }

    public void setDs_status(String ds_status) {
        this.ds_status = ds_status;
    }

    public String getDs_obs() {
        return ds_obs;
    }

    public void setDs_obs(String ds_obs) {
        this.ds_obs = ds_obs;
    }

    public String getTx_foto() {
        return tx_foto;
    }

    public void setTx_foto(String tx_foto) {
        this.tx_foto = tx_foto;
    }
}
