package com.br.adoteappapi.controller;

import com.br.adoteappapi.repositories.PetRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
@Controller
@RequestMapping("/pet")

public class PetController {

    @Autowired
    PetRepositoryImpl petRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarPet(@RequestBody Pet pet) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        petRepository.cadastrarPet(pet);
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity atualizarDadosPet(@PathVariable Long id, @RequestBody Pet pet){
        petRepository.atualizarDadosPet(id,pet);
        return ResponseEntity.ok("Dados atualizados com Sucesso");
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity atualizarDadosPet(@PathVariable Long id){
        petRepository.deletarPet(id);
        return ResponseEntity.ok("Cliente deletado da base de dados");
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<Pet> consultarDadosPet(@PathVariable Long id){
        return ResponseEntity.ok(petRepository.consultarDadosPet(id));
    }
}



