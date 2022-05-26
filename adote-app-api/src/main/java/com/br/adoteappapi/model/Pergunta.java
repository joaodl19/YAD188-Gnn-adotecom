package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pergunta {
    private Long id_pergunta;
    private String ds_pergunta;

    public Pergunta(long id_pergunta, String ds_pergunta) {
        this.id_pergunta = id_pergunta;
        this.ds_pergunta = ds_pergunta;
    }
}
