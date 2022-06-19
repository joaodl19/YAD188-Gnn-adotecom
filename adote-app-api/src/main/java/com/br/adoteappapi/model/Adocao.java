package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Adocao {
    private Long id_adocao;
    private Long id_cliente;
    private Long id_pet;
    private Long id_visita;
    private String dt_adocao;
    private String ds_status;
    private String ds_ciclo;
    private String ds_obs;
}
