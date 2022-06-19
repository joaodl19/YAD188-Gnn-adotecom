package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.QuestionarioResponse;
import com.br.adoteappapi.model.QuestionarioResponseCliente;
import com.br.adoteappapi.model.RespostasQuestionario;
import com.br.adoteappapi.repositories.AdocaoRepositoryImpl;
import com.br.adoteappapi.repositories.QuestionarioRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/questionario")
public class QuestionarioController {

    private Logger logger = LoggerFactory.getLogger(QuestionarioController.class);

    @Autowired
    QuestionarioRepositoryImpl repository;
    @Autowired
    AdocaoRepositoryImpl adocaoRepository;
    @GetMapping
    public ResponseEntity<List<QuestionarioResponse>> buscarQuestionario(){
        System.out.println("Buscando Questionario");
        return ResponseEntity.ok(repository.buscarQuestionario());
    }

    @GetMapping("/{id_cliente}")
    public ResponseEntity<List<QuestionarioResponseCliente>> buscarQuestionarioCliente(@PathVariable Long id_cliente){
        System.out.println("Buscando Questionario");
        return ResponseEntity.ok(repository.buscarQuestionarioCliente(id_cliente));
    }

    @PostMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity inserirQuestionario(@PathVariable Long id, @RequestBody List<RespostasQuestionario> respostasQuestionarios){
        var id_questionario = repository.inserirQuestionario(id, respostasQuestionarios);
        adocaoRepository.inserirIdQuetionario(id, id_questionario);
        logger.info("questionario cadastrado com sucesso");
        var idAdocao = adocaoRepository.buscarIdPorCliente(id);
        logger.info("idAdocao encontrado");
        adocaoRepository.alterarCiclo(idAdocao, "Agendar visita");
        return ResponseEntity.ok("Sucesso");
    }

}
