package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionarioResponse {
    private Pergunta pergunta;
    private List<Resposta> respostas;
}
