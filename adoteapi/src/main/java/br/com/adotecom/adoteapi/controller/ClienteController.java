package br.com.adotecom.adoteapi.controller;

import br.com.adotecom.adoteapi.dto.ClienteDto;
import br.com.adotecom.adoteapi.model.Cliente;
import br.com.adotecom.adoteapi.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    ClienteRepository clienteRepository;

    @PostMapping
        public void cadastroCliente(@RequestBody ClienteDto cliente) throws ParseException {
        clienteRepository.save(ClienteDto.toCliente(cliente));
    }

    @GetMapping
    public List<ClienteDto> consultaAllCliente(){
       List<ClienteDto> lista_retornada = new ArrayList<ClienteDto>();
       List<Cliente> lista_clientes = clienteRepository.findAll();

       lista_clientes.forEach(cliente -> lista_retornada.add(ClienteDto.toClienteRetornado(cliente)));
       return lista_retornada;
    }

    @GetMapping("/{id}")
    public Optional<Cliente> consultaAllCliente(@PathVariable Long id){
        System.out.println("OK");
        return clienteRepository.findById(id);
    }
}
