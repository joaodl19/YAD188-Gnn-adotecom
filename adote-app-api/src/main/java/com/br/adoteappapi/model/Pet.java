package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pet {
    private Long id_pet;
    private String ds_nome;
    private String dt_nascimento;
    private String ds_raca;
    private String ds_genero;
    private Long id_ong;
    private String ds_status;
    private String ds_obs;
    private byte[] tx_foto;

    public Pet() {

    }

    public Pet(long id_pet, String ds_nome, String ds_genero, String ds_raca, String ds_status, String dt_nascimento, long id_ong, byte[] tx_foto, String ds_obs) {
        this.id_pet = id_pet;
        this.ds_nome = ds_nome;
        this.ds_genero = ds_genero;
        this.ds_raca = ds_raca;
        this.ds_status = ds_status;
        this.dt_nascimento = dt_nascimento;
        this.id_ong = id_ong;
        this.tx_foto = tx_foto;
        this.ds_obs = ds_obs;
    }


}
