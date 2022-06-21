package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Pet;

import java.util.List;

public interface PetRepository {
    void cadastrarPet(Pet pet);

    void atualizarDadosPet(Long id, Pet pet);

    void alterarStatusPet(Long id, String status);

    void deletarPet(Long id);

    Pet consultarDadosPet(Long id);

    List<Pet> consultarDadosPetStatus(String statusPet);

    List<Pet> consultarDadosPetFiltro(String filtro);

    List<Pet> consultarDadosPetPorOng(long id_ong);

    void atualizarStatusPet(Long id, String status);

    List<Pet> consultarDadosPetStatusUf(String statusPet, String uf);
}
