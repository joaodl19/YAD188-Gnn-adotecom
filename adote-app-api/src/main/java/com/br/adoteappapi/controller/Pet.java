package com.br.adoteappapi.controller;

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
    private String tx_foto;
}
