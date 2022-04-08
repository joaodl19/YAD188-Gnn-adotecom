package br.com.adotecom.adoteapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Adocao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_adocao;
    private Long id_cliente;
    private Long id_pet;
    private Long id_visita;
    private String dt_adocao;
    private String ds_status;
    private String ds_obs;

    public Long getId_adocao() {
        return id_adocao;
    }

    public void setId_adocao(Long id_adocao) {
        this.id_adocao = id_adocao;
    }

    public Long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }

    public Long getId_pet() {
        return id_pet;
    }

    public void setId_pet(Long id_pet) {
        this.id_pet = id_pet;
    }

    public Long getId_visita() {
        return id_visita;
    }

    public void setId_visita(Long id_visita) {
        this.id_visita = id_visita;
    }

    public String getDt_adocao() {
        return dt_adocao;
    }

    public void setDt_adocao(String dt_adocao) {
        this.dt_adocao = dt_adocao;
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
}
