package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgendamentoResponse {
    private String ds_status;
    private String ds_nome_cliente;
    private String ds_nome_pet;
    private Long id_agendamento;
    private String dt_visita;
    private Long id_cliente;
    public AgendamentoResponse(){

    }
    public AgendamentoResponse(long id_agendamento, String ds_status, String dt_visita, String ds_nome_cliente, String ds_nome_pet, long id_cliente) {
        this.id_agendamento = id_agendamento;
        this.ds_nome_cliente = ds_nome_cliente;
        this.ds_nome_pet = ds_nome_pet;
        this.dt_visita = dt_visita;
        this.ds_status = ds_status;
        this.id_cliente = id_cliente;
    }
}
