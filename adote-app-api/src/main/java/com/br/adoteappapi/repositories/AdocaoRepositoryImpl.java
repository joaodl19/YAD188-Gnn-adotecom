package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Adocao;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class AdocaoRepositoryImpl implements AdocaoRepository {

    private final JdbcTemplate jdbcTemplate;
    private final PetRepositoryImpl petRepository;
    private String QUERY_CADASTRAR_ADOCAO;
    private String QUERY_INSERIR_ID_QUESTIONARIO_ADOCAO;
    private String QUERY_BUSCAR_ID_POR_CLIENTE;
    private String QUERY_ALTERAR_CICLO;
    private String QUERY_BUSCAR_ADOCAO_ABERTO_POR_PET;

    public AdocaoRepositoryImpl(JdbcTemplate jdbcTemplate, PetRepositoryImpl petRepository) {

        this.jdbcTemplate = jdbcTemplate;
        this.petRepository = petRepository;
        this.QUERY_CADASTRAR_ADOCAO = "INSERT INTO public.adocao(id_cliente, id_pet, ds_status, ds_ciclo) VALUES (?, ?, ?, ?);";
        this.QUERY_INSERIR_ID_QUESTIONARIO_ADOCAO = "UPDATE public.adocao SET id_questionario = ? \n" +
                "WHERE id_cliente = ? AND ds_status = 'Aberto'";
        this.QUERY_BUSCAR_ID_POR_CLIENTE = "SELECT ID_ADOCAO FROM public.adocao WHERE id_cliente = ? AND ds_status = 'Aberto'";
        this.QUERY_ALTERAR_CICLO = "UPDATE public.adocao SET ds_ciclo = ? WHERE id_adocao = ?";
        this.QUERY_BUSCAR_ADOCAO_ABERTO_POR_PET = "SELECT * FROM public.adocao WHERE id_pet = ? AND ds_status =  'Aberto'";
    }

    @Override
    public void cadastrarAdocao(Adocao adocao) {
        petRepository.alterarStatusPet(adocao.getId_pet(), "Aguardando aprovação agendamento");

        jdbcTemplate.update(connection ->   {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_ADOCAO);
            ps.setLong(1, adocao.getId_cliente());
            ps.setLong(2, adocao.getId_pet());
            ps.setString(3, "Aberto");
            ps.setString(4,"Responder questionario");
            return ps;
        });
    }

    @Override
    public void inserirIdQuetionario(Long id, int id_questionario) {
        System.out.println("ID_CLIENTE: " + id + "ID_QUESTIONARIO: " + id_questionario);
        jdbcTemplate.update(QUERY_INSERIR_ID_QUESTIONARIO_ADOCAO, id_questionario, id);
    }

    @Override
    public int buscarIdPorCliente(Long id) {
        AtomicInteger idAdocao = new AtomicInteger();
        jdbcTemplate.query(QUERY_BUSCAR_ID_POR_CLIENTE, rs -> {
            idAdocao.set(rs.getInt("id_adocao"));
        },id);
        return idAdocao.intValue();
    }

    @Override
    public void alterarCiclo(int idAdocao, String ciclo) {
        jdbcTemplate.update(QUERY_ALTERAR_CICLO, ciclo, idAdocao);
    }

    @Override
    public Adocao buscarAdocaoPorPet(Long id_pet) {
        Adocao adocao = new Adocao();
        jdbcTemplate.query(QUERY_BUSCAR_ADOCAO_ABERTO_POR_PET, rs -> {
            adocao.setDt_adocao(rs.getString("dt_adocao"));
            adocao.setId_adocao(rs.getLong("id_adocao"));
            adocao.setDs_ciclo(rs.getString("ds_ciclo"));
            adocao.setId_pet(rs.getLong("id_pet"));
            adocao.setId_cliente(rs.getLong("id_cliente"));
            adocao.setDs_status(rs.getString("ds_status"));
            adocao.setId_visita(rs.getLong("id_visita"));
            adocao.setDs_obs(rs.getString("ds_obs"));
        },id_pet);
        return adocao;
    }
}
