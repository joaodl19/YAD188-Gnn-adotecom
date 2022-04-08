package br.com.adotecom.adoteapi.repository;

import br.com.adotecom.adoteapi.model.Adocao;
import br.com.adotecom.adoteapi.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
    List<Adocao> findAll();
}
