package com.br.adoteappapi.controller;


import com.br.adoteappapi.model.Cliente;
import com.br.adoteappapi.repositories.ClienteRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.jar.JarOutputStream;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteRepositoryImpl clienteRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity cadastrarCliente(@RequestBody Cliente cliente) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        clienteRepository.cadastrarCliente(cliente);
        return ResponseEntity.ok("Cadastro Realizado com Sucesso");
    }

    @PutMapping(value = "/{cpf}")
    @ResponseBody
    public ResponseEntity atualizarDadosCliente(@PathVariable String cpf, @RequestBody Cliente cliente){
        clienteRepository.atualizarDadosCliente(cpf,cliente);
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
        System.out.println("OK");
        System.out.println(clienteRepository.consultarDadosCliente(cpf));
        return ResponseEntity.ok(clienteRepository.consultarDadosCliente(cpf));
    }
}

