package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.Adocao;
import com.br.adoteappapi.model.Cliente;
import com.br.adoteappapi.repositories.AdocaoRepository;
import com.br.adoteappapi.repositories.AdocaoRepositoryImpl;
import com.br.adoteappapi.repositories.ClienteRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adocao")
public class AdocaoController {

    @Autowired
    AdocaoRepositoryImpl adocaoRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarCliente(@RequestBody Adocao adocao) {
        adocaoRepository.cadastrarAdocao(adocao);
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }
}
