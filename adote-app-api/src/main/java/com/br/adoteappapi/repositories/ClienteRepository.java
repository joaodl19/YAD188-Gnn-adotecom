package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Cliente;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

public interface ClienteRepository {
    public void cadastrarCliente(Cliente cliente) throws NoSuchAlgorithmException, UnsupportedEncodingException;

    void atualizarDadosCliente(String cpf, Cliente cliente);

    void deletarCliente(String cpf);

    Cliente consultarDadosCliente(String cpf);

}
