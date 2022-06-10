package com.br.adoteappapi.controller;


import com.br.adoteappapi.model.Cliente;
import com.br.adoteappapi.repositories.ClienteRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;


@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteRepositoryImpl clienteRepository;
    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarCliente(@RequestBody Cliente cliente) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        logger.info("Cadastrando cliente ...");
        clienteRepository.cadastrarCliente(cliente);
        logger.info("Cliente cadastrado");
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }

    @PutMapping(value = "/{cpf}")
    @ResponseBody
    public ResponseEntity<?> atualizarDadosCliente(@PathVariable String cpf, @RequestBody Cliente cliente){
        logger.info("Atualizando dados cliente ...");
        clienteRepository.atualizarDadosCliente(cpf,cliente);
        logger.info("Dados cliente atualizados");
        return ResponseEntity.ok("Dados atualizados com Sucesso");
    }

    @DeleteMapping(value = "/{cpf}")
    @ResponseBody
    public ResponseEntity atualizarDadosCliente(@PathVariable String cpf){
        clienteRepository.deletarCliente(cpf);
        return ResponseEntity.ok("Cliente deletado da base de dados");
    }

    @GetMapping(value = "/{cpf}")
    @ResponseBody
    public ResponseEntity<Cliente> consultarDadosCliente(@PathVariable String cpf){
        logger.info("Buscando cliente ...");
        var response = clienteRepository.consultarDadosCliente(cpf);
        logger.info("Cliente encontrado");
        return ResponseEntity.ok(response);
    }
}

