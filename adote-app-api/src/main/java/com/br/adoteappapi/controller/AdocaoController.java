package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.Adocao;
import com.br.adoteappapi.model.Cliente;
import com.br.adoteappapi.repositories.AdocaoRepository;
import com.br.adoteappapi.repositories.AdocaoRepositoryImpl;
import com.br.adoteappapi.repositories.ClienteRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

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

    @GetMapping("/aberto/pet/{id_pet}")
    @ResponseBody
    public ResponseEntity<Adocao> buscarAdocaoAbertaPorPet(@PathVariable Long id_pet){
        var response = adocaoRepository.buscarAdocaoPorPet(id_pet);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id_pet}/encerrar")
    @ResponseBody
    public ResponseEntity<?> encerrarAdocao(@PathVariable Long id_pet){
        var adocao = adocaoRepository.buscarAdocaoPorPet(id_pet);
        adocaoRepository.encerrarAdocao(adocao.getId_adocao());
        var response = adocaoRepository.buscarAdocaoPorPet(id_pet);
        return ResponseEntity.ok(response);
    }

}
