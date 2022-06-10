package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Agendamento;
import com.br.adoteappapi.model.AgendamentoResponse;

import java.util.List;

public interface AgendamentoRepository {
    public void solicitarAgendamento(Agendamento agendamento);

    List<AgendamentoResponse> buscarAgendamentoOng(Long idOng);

    void aprovarAgendamento(Long idAgendamento);

    AgendamentoResponse buscarAgendamentoPet(Long idPet);
}
