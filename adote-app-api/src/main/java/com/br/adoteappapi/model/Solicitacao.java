package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Solicitacao {
    private String ds_nome_pet;
    private String ds_nome_ong;
    private String dt_visita;
    private String dt_adocao;
    private String ds_status;
    private Long id_pet;
    private Long id_adocao;

    public Solicitacao(String ds_nome_pet, String ds_nome_ong, String dt_visita, String dt_adocao, String ds_status, long id_pet, long id_adocao) {
        this.ds_nome_pet = ds_nome_pet;
        this.ds_nome_ong = ds_nome_ong;
        this.ds_status = ds_status;
        this.dt_visita = dt_visita;
        this.dt_adocao = dt_adocao;
        this.id_adocao = id_adocao;
        this.id_pet = id_pet;
    }
}
