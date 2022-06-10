package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.QuestionarioResponse;
import com.br.adoteappapi.model.QuestionarioResponseCliente;
import com.br.adoteappapi.model.RespostasQuestionario;
import com.br.adoteappapi.repositories.QuestionarioRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/questionario")
public class QuetionarioController {

    @Autowired
    QuestionarioRepositoryImpl repository;

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
        for(RespostasQuestionario respostas : respostasQuestionarios){
            System.out.println(respostas.getDs_pergunta());
            System.out.println(respostas.getDs_resposta());
            System.out.println(respostas.getId_pergunta());
        }
        repository.inserirQuestionario(id, respostasQuestionarios);
        return ResponseEntity.ok("Sucesso");
    }

}
