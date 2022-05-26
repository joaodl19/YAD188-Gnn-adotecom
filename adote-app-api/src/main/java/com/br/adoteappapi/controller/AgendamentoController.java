package com.br.adoteappapi.controller;
import com.br.adoteappapi.model.Agendamento;
import com.br.adoteappapi.model.AgendamentoResponse;
import com.br.adoteappapi.repositories.AgendamentoRepository;
import com.br.adoteappapi.repositories.AgendamentoRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    AgendamentoRepositoryImpl agendamentoRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity solicitarAgendamento(@RequestBody Agendamento agendamento) {
        agendamentoRepository.solicitarAgendamento(agendamento);
        System.out.println("BATEU");
        return ResponseEntity.ok("Visita solicitada com Sucesso");
    }

    @GetMapping("/{idOng}")
    public ResponseEntity<List<AgendamentoResponse>> buscarAgendamentoOng(@PathVariable Long idOng) {
        System.out.println("BATEU");
        return ResponseEntity.ok(agendamentoRepository.buscarAgendamentoOng(idOng));
    }

    @PutMapping("/{idAgendamento}/aprovar")
    public ResponseEntity aprovarAgendamento(@PathVariable Long idAgendamento) {
        agendamentoRepository.aprovarAgendamento(idAgendamento);
        System.out.println("BATEU");
        return ResponseEntity.ok("Agendamento Confirmado");
    }
}
