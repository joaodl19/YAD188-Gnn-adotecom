package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Pet;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class PetRepositoryImpl implements PetRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_CADASTRAR_PET;
    private String QUERY_ATUALIZAR_DADOS_PET;
    private String QUERY_DELETAR_PET;
    private String QUERY_CONSULTAR_DADOS_PET;
    private String QUERY_CONSULTAR_DADOS_PET_STATUS;
    private String QUERY_ALTERAR_STATUS_PET;
    private String QUERY_CONSULTAR_PET_FILTRO;
    private String QUERY_CONSULTAR_DADOS_PET_ONG;
    private String QUERY_ATUALIZAR_STATUS_PET;
    private String QUERY_CONSULTAR_DADOS_PET_STATUS_UF;
    private String QUERY_CONSULTAR_DADOS_PET_POR_FILTRO;

    public PetRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_CADASTRAR_PET = "INSERT INTO public.pet (ds_nome, dt_nascimento, ds_genero, ds_raca,id_ong, ds_obs, tx_foto, ds_status) VALUES (?,?,?,?,?,?,?,?) ";
        this.QUERY_ATUALIZAR_DADOS_PET = "UPDATE public.pet SET ds_nome=?, dt_nascimento=?, ds_genero=?, ds_raca=?, ds_obs=?, tx_foto=?)";
        this.QUERY_DELETAR_PET = "DELETE FROM public.pet WHERE id_pet = ?";
        this.QUERY_CONSULTAR_DADOS_PET = "SELECT c.ds_nome as ds_nome_ong, p.id_pet, p.ds_nome, p.dt_nascimento, p.ds_raca, p.ds_genero, p.id_ong, p.ds_status, p.ds_obs, p.tx_foto, p.ds_visita\n" +
                "FROM public.pet p\n" +
                "JOIN public.cliente c\n" +
                "ON p.id_ong = c.id_cliente\n" +
                "WHERE p.id_pet = ?;";
        this.QUERY_CONSULTAR_DADOS_PET_STATUS = "SELECT c.ds_nome as ds_nome_ong, p.id_pet, p.ds_nome, p.dt_nascimento, p.ds_raca, p.ds_genero, p.id_ong, p.ds_status, p.ds_obs, p.tx_foto, p.ds_visita\n" +
                "FROM public.pet p\n" +
                "JOIN public.cliente c\n" +
                "ON p.id_ong = c.id_cliente\n" +
                " WHERE ds_status = ?";
        this.QUERY_CONSULTAR_DADOS_PET_ONG = "SELECT c.ds_nome as ds_nome_ong, p.id_pet, p.ds_nome, p.dt_nascimento, p.ds_raca, p.ds_genero, p.id_ong, p.ds_status, p.ds_obs, p.tx_foto, p.ds_visita\n" +
                "FROM public.pet p\n" +
                "JOIN public.cliente c\n" +
                "ON p.id_ong = c.id_cliente\n" +
                " WHERE p.id_ong = ?";
        this.QUERY_ALTERAR_STATUS_PET = "UPDATE public.pet SET ds_status=? WHERE id_pet = ?";
        this.QUERY_CONSULTAR_PET_FILTRO ="SELECT * FROM public.pet WHERE ds_raca LIKE '%?%'";
        this.QUERY_CONSULTAR_DADOS_PET_STATUS_UF =  "SELECT c.ds_nome as ds_nome_ong, p.id_pet, p.ds_nome, p.dt_nascimento, p.ds_raca, p.ds_genero, p.id_ong, p.ds_status, p.ds_obs, p.tx_foto, p.ds_visita\n" +
                "FROM public.pet p\n" +
                "JOIN public.cliente c\n" +
                "ON p.id_ong = c.id_cliente\n" +
                " WHERE ds_status = ? AND c.ds_uf = ?";
        this.QUERY_CONSULTAR_DADOS_PET_POR_FILTRO = "SELECT c.ds_nome as ds_nome_ong, p.id_pet, p.ds_nome, p.dt_nascimento, p.ds_raca, p.ds_genero, p.id_ong, p.ds_status, p.ds_obs, p.tx_foto, p.ds_visita\n" +
                "        FROM public.pet p\n" +
                "        JOIN public.cliente c\n" +
                "        ON p.id_ong = c.id_cliente\n" +
                "        WHERE p.ds_status = 'Disponivel' and (p.ds_nome like '%?%' or p.ds_raca like '%?%' or c.ds_nome like '%?%');";
    }

    @Override
    public void cadastrarPet(Pet pet) {
        SimpleDateFormat dateIn = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateOut = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date dtNascimento = new java.util.Date();
        try {
            dtNascimento = dateIn.parse(pet.getDt_nascimento());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        var dtNascimentoFinal = dateOut.format(dtNascimento);

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_PET);
            ps.setString(1, pet.getDs_nome());
            ps.setDate(2, java.sql.Date.valueOf(dtNascimentoFinal));
            ps.setString(3, pet.getDs_genero());
            ps.setString(4, pet.getDs_raca());
            ps.setLong(5, pet.getId_ong());
            ps.setString(6, pet.getDs_obs());
            ps.setBytes(7, pet.getTx_foto());
            ps.setString(8, "Disponivel");
            return ps;
        });
    }

    @Override
    public void atualizarDadosPet(Long id, Pet pet) {
        SimpleDateFormat dateIn = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateOut = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date dtNascimento = new java.util.Date();
        try {
            dtNascimento = dateIn.parse(pet.getDt_nascimento());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        var dtNascimentoFinal = dateOut.format(dtNascimento);
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                            .prepareStatement(QUERY_ATUALIZAR_DADOS_PET);
        ps.setString(1, pet.getDs_nome());
        ps.setDate(2, java.sql.Date.valueOf(dtNascimentoFinal));
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
        SimpleDateFormat dateOut = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateIn = new SimpleDateFormat("yyyy-MM-dd");
        Date dtNascimento = new Date();

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
            pet.setDs_nome_ong(rs.getString("ds_nome_ong"));
            pet.setDs_obs(rs.getString("ds_obs"));
        }, id);
        try {
            dtNascimento = dateIn.parse(pet.getDt_nascimento());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        pet.setDt_nascimento(dateOut.format(dtNascimento));
        return pet;
    }

    @Override
    public List<Pet> consultarDadosPetStatus(String statusPet) {
        List<Pet> pets;
        pets = jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET_STATUS, (rs, rowNumber) ->
            new Pet(
                            rs.getLong("id_pet"),
                            rs.getString("ds_nome"),
                            rs.getString("ds_genero"),
                            rs.getString("ds_raca"),
                            rs.getString("ds_status"),
                            rs.getString("dt_nascimento"),
                            rs.getLong("id_ong"),
                            rs.getBytes("tx_foto"),
                            rs.getString("ds_nome_ong"),
                            rs.getString("ds_obs"))
        , statusPet);
        return pets;
    }

    @Override
    public List<Pet> consultarDadosPetFiltro(String filtro) {
        List<Pet> pets = new ArrayList<>();
        return pets;
    }

    @Override
    public List<Pet> consultarDadosPetPorOng(long id_ong) {
        List<Pet> pets;
        pets = jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET_ONG, (rs, rowNumber) -> new Pet(
                rs.getLong("id_pet"),
                rs.getString("ds_nome"),
                rs.getString("ds_genero"),
                rs.getString("ds_raca"),
                rs.getString("ds_status"),
                rs.getString("dt_nascimento"),
                rs.getLong("id_ong"),
                rs.getBytes("tx_foto"),
                rs.getString("ds_nome_ong"),
                rs.getString("ds_obs"))
        ,id_ong);
        return pets;
    }

    @Override
    public void atualizarStatusPet(Long id, String status) {

    }

    @Override
    public List<Pet> consultarDadosPetStatusUf(String statusPet, String uf) {
        List<Pet> pets;
        pets = jdbcTemplate.query(QUERY_CONSULTAR_DADOS_PET_STATUS_UF, (rs, rowNumber) ->
                        new Pet(
                                rs.getLong("id_pet"),
                                rs.getString("ds_nome"),
                                rs.getString("ds_genero"),
                                rs.getString("ds_raca"),
                                rs.getString("ds_status"),
                                rs.getString("dt_nascimento"),
                                rs.getLong("id_ong"),
                                rs.getBytes("tx_foto"),
                                rs.getString("ds_nome_ong"),
                                rs.getString("ds_obs"))
                , statusPet, uf.toUpperCase());
        return pets;
    }

    @Override
    public List<Pet> consultarDadosPetPorFiltro(String filtro) {
        return null;
    }

    @Override
    public List<Pet> consultarDadosPetPorFiltro(String filtro, String status) {
        List<Pet> pets;
        String QUERY = QUERY_CONSULTAR_DADOS_PET_POR_FILTRO.replaceAll("\\?",filtro);
        pets = jdbcTemplate.query(QUERY, (rs, rowNumber) ->
                        new Pet(
                                rs.getLong("id_pet"),
                                rs.getString("ds_nome"),
                                rs.getString("ds_genero"),
                                rs.getString("ds_raca"),
                                rs.getString("ds_status"),
                                rs.getString("dt_nascimento"),
                                rs.getLong("id_ong"),
                                rs.getBytes("tx_foto"),
                                rs.getString("ds_nome_ong"),
                                rs.getString("ds_obs"))
                );
        return pets;    }
}
