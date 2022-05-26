package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Pet;
import com.br.adoteappapi.enums.StatusPetEnum;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class PetRepositoryImpl implements PetRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_CADASTRAR_PET;
    private String QUERY_ATUALIZAR_DADOS_PET;
    private String QUERY_DELETAR_PET;
    private String QUERY_CONSULTAR_DADOS_PET;
    private String QUERY_CONSULTAR_DADOS_PET_DISPONIVEL;
    private String QUERY_ALTERAR_STATUS_PET;
    private String QUERY_CONSULTAR_PET_FILTRO;


    public PetRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_CADASTRAR_PET = "INSERT INTO public.pet (ds_nome, dt_nascimento, ds_genero, ds_raca,id_ong, ds_obs, tx_foto, ds_status) VALUES (?,?,?,?,?,?,?,?) ";
        this.QUERY_ATUALIZAR_DADOS_PET = "UPDATE public.pet SET ds_nome=?, dt_nascimento=?, ds_genero=?, ds_raca=?, ds_obs=?, tx_foto=?)";
        this.QUERY_DELETAR_PET = "DELETE FROM public.pet WHERE id_pet = ?";
        this.QUERY_CONSULTAR_DADOS_PET = "SELECT * FROM public.pet WHERE id_pet = ?";
        this.QUERY_CONSULTAR_DADOS_PET_DISPONIVEL = "SELECT * FROM public.pet WHERE ds_status = 'DISPONIVEL'";
        this.QUERY_ALTERAR_STATUS_PET = "UPDATE public.pet SET ds_status=? WHERE id_pet = ?";
        this.QUERY_CONSULTAR_PET_FILTRO ="SELECT * FROM public.pet WHERE ds_raca LIKE '%?%'";
    }

    @Override
    public void cadastrarPet(Pet pet) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_PET);
            ps.setString(1, pet.getDs_nome());
            ps.setDate(2, Date.valueOf(pet.getDt_nascimento()));
            ps.setString(3, pet.getDs_genero());
            ps.setString(4, pet.getDs_raca());
            ps.setLong(5, pet.getId_ong());
            ps.setString(6, pet.getDs_obs());
            ps.setBytes(7, pet.getTx_foto());
            ps.setString(8, StatusPetEnum.DISPONIVEL.toString());
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
        ps.setBytes(8, pet.getTx_foto());
        return ps;
    });
    }

    @Override
    public void alterarStatusPet(Long id, String status) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_ALTERAR_STATUS_PET);
            ps.setString(1, status);
            ps.setLong(2, id);
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
            pet.setTx_foto(rs.getBytes("tx_foto"));
            pet.setDs_obs(rs.getString("ds_obs"));
        }, id);
        return pet;
    }

    @Override
    public List<Pet> consultarDadosPetDisponivel() {
        List<Pet> pets;
        pets = jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET_DISPONIVEL, (rs, rowNumber) -> new Pet(
            rs.getLong("id_pet"),
            rs.getString("ds_nome"),
            rs.getString("ds_genero"),
            rs.getString("ds_raca"),
            rs.getString("ds_status"),
            rs.getString("dt_nascimento"),
            rs.getLong("id_ong"),
            rs.getBytes("tx_foto"),
            rs.getString("ds_obs"))
        );
        return pets;
    }

    @Override
    public List<Pet> consultarDadosPetFiltro(String filtro) {
        List<Pet> pets;
        QUERY_CONSULTAR_DADOS_PET_DISPONIVEL = "SELECT * FROM public.pet WHERE ds_raca LIKE '%" +filtro+"?%";
        pets = jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET_DISPONIVEL, (rs, rowNumber) -> new Pet(
                rs.getLong("id_pet"),
                rs.getString("ds_nome"),
                rs.getString("ds_genero"),
                rs.getString("ds_raca"),
                rs.getString("ds_status"),
                rs.getString("dt_nascimento"),
                rs.getLong("id_ong"),
                rs.getBytes("tx_foto"),
                rs.getString("ds_obs"))
        );
        return pets;
    }
}
