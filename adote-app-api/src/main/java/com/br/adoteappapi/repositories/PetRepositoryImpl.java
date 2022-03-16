package com.br.adoteappapi.repositories;

import com.br.adoteappapi.controller.Pet;
import com.br.adoteappapi.enums.StatusPetEnum;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;

@Repository
public class PetRepositoryImpl implements PetRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_CADASTRAR_PET;
    private String QUERY_ATUALIZAR_DADOS_PET;
    private String QUERY_DELETAR_PET;
    private String QUERY_CONSULTAR_DADOS_PET;

    public PetRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_CADASTRAR_PET = "INSERT INTO public.pet (ds_nome, dt_nascimento, ds_genero, ds_raca,id_ong, ds_obs, tx_foto, ds_status) VALUES (?,?,?,?,?,?,?,?) ";
        this.QUERY_ATUALIZAR_DADOS_PET = "UPDATE public.pet SET ds_nome=?, dt_nascimento=?, ds_genero=?, ds_raca=?, ds_obs=?, tx_foto=?)";
        this.QUERY_DELETAR_PET = "DELETE FROM public.pet WHERE id_pet = ?";
        this.QUERY_CONSULTAR_DADOS_PET = "SELECT * FROM public.pet WHERE id_pet = ?";
    }

    @Override
    public void cadastrarPet(Pet pet) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_PET);
            ps.setString(1, pet.getDs_nome());
            ps.setDate(3, Date.valueOf(pet.getDt_nascimento()));
            ps.setString(4, pet.getDs_genero());
            ps.setString(5, pet.getDs_raca());
            ps.setLong(6, pet.getId_ong());
            ps.setString(7, pet.getDs_obs());
            ps.setString(8, pet.getTx_foto());
            ps.setString(9, StatusPetEnum.DISPONIVEL.toString());
            return ps;
        });
    }

    @Override
    public void atualizarDadosPet(Long id, Pet pet) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                            .prepareStatement(QUERY_ATUALIZAR_DADOS_PET);
        ps.setString(1, pet.getDs_nome());
        ps.setDate(3, Date.valueOf(pet.getDt_nascimento()));
        ps.setString(4, pet.getDs_genero());
        ps.setString(5, pet.getDs_raca());
        ps.setString(7, pet.getDs_obs());
        ps.setString(8, pet.getTx_foto());
        return ps;
    });
    }

    @Override
    public void deletarPet(Long id) {
        jdbcTemplate.update(QUERY_DELETAR_PET, id);
    }

    @Override
    public Pet consultarDadosPet(Long id) {
        Pet pet = new Pet();
        jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET, rs -> {
            pet.setId_pet(rs.getLong("id_pet"));
            pet.setDs_nome(rs.getString("ds_nome"));
            pet.setDs_genero(rs.getString("ds_genero"));
            pet.setDs_raca(rs.getString("ds_raca"));
            pet.setDs_status(rs.getString("ds_status"));
            pet.setDt_nascimento(rs.getString("dt_nascimento"));
            pet.setId_ong(rs.getLong("id_ong"));
            pet.setTx_foto(rs.getString("tx_foto"));
            pet.setDs_obs(rs.getString("ds_obs"));
        });
        return pet;
    }
}
