package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.Pet;
import com.br.adoteappapi.repositories.PetRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
@RequestMapping("/pet")

public class PetController {

    @Autowired
    PetRepositoryImpl petRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarPet(@RequestBody Pet pet) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        petRepository.cadastrarPet(pet);
        System.out.println("cadastrando Pet");
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity atualizarDadosPet(@PathVariable Long id, @RequestBody Pet pet){
        petRepository.atualizarDadosPet(id,pet);
        return ResponseEntity.ok("Dados atualizados com Sucesso");
    }

    @PutMapping(value = "/{id}/{status}")
    @ResponseBody
    public ResponseEntity alterarStatusPet(@PathVariable Long id, @PathVariable String status){
        System.out.println("ID: " + id + "Status: " + status);
        petRepository.alterarStatusPet(id,status);
        return ResponseEntity.ok("Dados atualizados com Sucesso");
    }

    @DeleteMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity deletarDadosPet(@PathVariable Long id){
        petRepository.deletarPet(id);
        return ResponseEntity.ok("Pet deletado da base de dados");
    }

    @GetMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity<Pet> consultarDadosPet(@PathVariable Long id){
        return ResponseEntity.ok(petRepository.consultarDadosPet(id));
    }

    @GetMapping(value = "/ong/{id_ong}")
    @ResponseBody
    public ResponseEntity<List<Pet>> consultarDadosPetFiltro(@PathVariable long id_ong){
        return ResponseEntity.ok(petRepository.consultarDadosPetPorOng(id_ong));
    }

    @GetMapping(value = "/status/disponivel")
    @ResponseBody
    public ResponseEntity<List<Pet>> consultarDadosPetDisponivel(){
        System.out.println("Buscando Pets");
        return ResponseEntity.ok(petRepository.consultarDadosPetDisponivel());
    }
}



