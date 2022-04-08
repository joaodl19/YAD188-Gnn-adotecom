package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Adocao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class AdocaoRepositoryImpl implements AdocaoRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_CADASTRAR_ADOCAO;
    private final PetRepositoryImpl petRepository;

    public AdocaoRepositoryImpl(JdbcTemplate jdbcTemplate, PetRepositoryImpl petRepository) {

        this.jdbcTemplate = jdbcTemplate;
        this.petRepository = petRepository;
        this.QUERY_CADASTRAR_ADOCAO = "INSERT INTO public.adocao(id_cliente, id_pet, ds_status) VALUES (?, ?, ?);";
    }

    @Override
    public void cadastrarAdocao(Adocao adocao) {
        petRepository.alterarStatusPet(adocao.getId_pet(), "EM_PROCESSO_DE_ADOCAO");

        jdbcTemplate.update(connection ->   {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_ADOCAO);
            ps.setLong(1, adocao.getId_cliente());
            ps.setLong(2, adocao.getId_pet());
            ps.setString(3, "INICIADO");
            return ps;
        });
    }
}
