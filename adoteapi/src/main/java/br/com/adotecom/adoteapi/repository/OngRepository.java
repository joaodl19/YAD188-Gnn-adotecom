package br.com.adotecom.adoteapi.repository;

import br.com.adotecom.adoteapi.model.Ong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OngRepository extends JpaRepository<Ong,Long> {
    List<Ong> findAll();

}
