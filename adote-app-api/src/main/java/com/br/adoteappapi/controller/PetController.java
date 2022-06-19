package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.Pet;
import com.br.adoteappapi.repositories.PetRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/pet")

public class PetController {

    @Autowired
    PetRepositoryImpl petRepository;
    private Logger logger = LoggerFactory.getLogger(PetController.class);

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarPet(@RequestBody Pet pet) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        logger.info("cadastrando pet");
        petRepository.cadastrarPet(pet);
        logger.info("pet cadastrado com sucesso");
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public ResponseEntity atualizarDadosPet(@PathVariable Long id, @RequestBody Pet pet){
        logger.info("atualizando dados pet");
        try {
            petRepository.atualizarDadosPet(id, pet);
        }catch (Exception e){
            e.printStackTrace();
            logger.info("erro ao atualizar dados pet");
        }
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

    @GetMapping(value = "/status/{statusPet}")
    @ResponseBody
    public ResponseEntity<List<Pet>> consultarDadosPetDisponivel(@PathVariable String statusPet){
        logger.info("Buscando pets com status " + statusPet);
        List<Pet> pets = new ArrayList<>();
        try {
            pets = petRepository.consultarDadosPetStatus(statusPet);
        }catch (Exception e){
            e.printStackTrace();
            logger.info("erro ao buscar pets com status " + statusPet);
        }
        return ResponseEntity.ok(pets);
    }
}



