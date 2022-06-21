package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Solicitacao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SolicitacaoRepositoryImpl implements  SolicitacaoRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_BUSCAR_SOLICITACOES;


    public SolicitacaoRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_BUSCAR_SOLICITACOES = "SELECT pet.ds_nome as ds_nome_pet, pet.ds_status, pet.id_pet, ad.id_adocao, ad.dt_adocao,ag.dt_visita, cl.ds_nome as ds_nome_ong \n" +
                "FROM public.pet pet\n" +
                "JOIN public.adocao ad\n" +
                "ON ad.id_pet = pet.id_pet\n" +
                "JOIN public.agendamento ag\n" +
                "ON ag.id_cliente = ad.id_cliente AND ag.id_pet = pet.id_pet\n" +
                "JOIN public.cliente cl\n" +
                "ON pet.id_ong = cl.id_cliente\n" +
                "WHERE ad.id_cliente = ?;";
    }


    @Override
    public List<Solicitacao> buscarSolicitacoes(Long id_cliente) {
        SimpleDateFormat dateOut = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateIn = new SimpleDateFormat("yyyy-MM-dd");

        List<Solicitacao> solicitacaos = new ArrayList<>();
        solicitacaos = jdbcTemplate.query(QUERY_BUSCAR_SOLICITACOES,(rs, rowNumber) ->
                new Solicitacao(
                        rs.getString("ds_nome_pet"),
                        rs.getString("ds_nome_ong"),
                        rs.getString("dt_visita"),
                        rs.getString("dt_adocao"),
                        rs.getString("ds_status"),
                        rs.getLong("id_pet"),
                        rs.getLong("id_adocao")
                ),id_cliente);
        var solicitacaoDtFormat = solicitacaos.stream().map(solicitacao -> {
            try {
                var dtVisita = dateIn.parse(solicitacao.getDt_visita());
                solicitacao.setDt_visita(dateOut.format(dtVisita));
                var dtAdocao = dateIn.parse(solicitacao.getDt_adocao());
                solicitacao.setDt_adocao(dateOut.format(dtAdocao));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return solicitacao;
        }).collect(Collectors.toList());

        return solicitacaoDtFormat;
    }
}
