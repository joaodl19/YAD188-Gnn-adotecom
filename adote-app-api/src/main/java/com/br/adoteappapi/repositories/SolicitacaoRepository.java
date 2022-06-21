package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Solicitacao;

import java.util.List;

public interface SolicitacaoRepository {
    List<Solicitacao> buscarSolicitacoes(Long id_cliente);
}
