package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Agendamento {

    private Long id_agendamento;
    private Long id_ong;
    private Long id_cliente;
    private Long id_pet;
    private String ds_status;
    private String dt_visita;

}
