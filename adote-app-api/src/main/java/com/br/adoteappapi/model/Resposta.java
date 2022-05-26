package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Resposta {
    private Long id_pergunta;
    private Long id_resposta;
    private String ds_resposta;

    public Resposta(long id_resposta, long id_pergunta, String ds_pergunta) {
        this.id_resposta = id_resposta;
        this.id_pergunta = id_pergunta;
        this.ds_resposta = ds_pergunta;
    }
}
