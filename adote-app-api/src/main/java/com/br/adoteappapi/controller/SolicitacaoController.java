package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.QuestionarioResponse;
import com.br.adoteappapi.model.QuestionarioResponseCliente;
import com.br.adoteappapi.model.RespostasQuestionario;
import com.br.adoteappapi.model.Solicitacao;
import com.br.adoteappapi.repositories.AdocaoRepositoryImpl;
import com.br.adoteappapi.repositories.QuestionarioRepositoryImpl;
import com.br.adoteappapi.repositories.SolicitacaoRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController()
@RequestMapping("/solicitacao")
public class SolicitacaoController {

    private Logger logger = LoggerFactory.getLogger(SolicitacaoController.class);
    @Autowired
    SolicitacaoRepositoryImpl repository;

    @GetMapping("/{id_cliente}")
    public ResponseEntity<List<Solicitacao>> buscarSolicitacoes(@PathVariable Long id_cliente){
        logger.info("Buscando Solicitacoes");
        List<Solicitacao> response = new ArrayList<>();
        response = repository.buscarSolicitacoes(id_cliente);
        return ResponseEntity.ok(response);
    }
}




