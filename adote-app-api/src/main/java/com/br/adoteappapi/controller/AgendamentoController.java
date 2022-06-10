package com.br.adoteappapi.controller;
import com.br.adoteappapi.model.Agendamento;
import com.br.adoteappapi.model.AgendamentoResponse;
import com.br.adoteappapi.repositories.AgendamentoRepository;
import com.br.adoteappapi.repositories.AgendamentoRepositoryImpl;
import com.br.adoteappapi.repositories.PetRepository;
import com.br.adoteappapi.repositories.PetRepositoryImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamento")
@Slf4j
public class AgendamentoController {

    @Autowired
    AgendamentoRepositoryImpl agendamentoRepository;
    @Autowired
    PetRepositoryImpl petRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity solicitarAgendamento(@RequestBody Agendamento agendamento) {
        agendamentoRepository.solicitarAgendamento(agendamento);
        return ResponseEntity.ok("Visita solicitada com Sucesso");
    }

    @GetMapping("/{idOng}")
    public ResponseEntity<List<AgendamentoResponse>> buscarAgendamentoOng(@PathVariable Long idOng) {
        return ResponseEntity.ok(agendamentoRepository.buscarAgendamentoOng(idOng));
    }

    @GetMapping("/pet/{idPet}")
    public ResponseEntity<AgendamentoResponse> buscarAgendamentoPet(@PathVariable Long idPet) {
        return ResponseEntity.ok(agendamentoRepository.buscarAgendamentoPet(idPet));
    }

    @PutMapping("/{idAgendamento}/aprovar")
    public ResponseEntity aprovarAgendamento(@PathVariable Long idAgendamento) {
        System.out.println("OKKK");
        agendamentoRepository.aprovarAgendamento(idAgendamento);

        return ResponseEntity.ok("Confirmado");
    }
}
