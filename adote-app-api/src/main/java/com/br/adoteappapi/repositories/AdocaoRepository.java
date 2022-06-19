package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Adocao;

public interface AdocaoRepository {
    void cadastrarAdocao(Adocao adocao);

    void inserirIdQuetionario(Long id, int id_questionario);

    int buscarIdPorCliente(Long id);

    void alterarCiclo(int idAdocao, String ciclo);
}
