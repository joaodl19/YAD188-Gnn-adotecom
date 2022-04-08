package br.com.adotecom.adoteapi.repository;

import br.com.adotecom.adoteapi.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findAll();
}
