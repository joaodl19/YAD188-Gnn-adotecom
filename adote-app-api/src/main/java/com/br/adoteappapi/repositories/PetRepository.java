package com.br.adoteappapi.repositories;

import com.br.adoteappapi.controller.Pet;

public interface PetRepository {
    void cadastrarPet(Pet pet);

    void atualizarDadosPet(Long id, Pet pet);

    void deletarPet(Long id);

    Pet consultarDadosPet(Long id);
}
