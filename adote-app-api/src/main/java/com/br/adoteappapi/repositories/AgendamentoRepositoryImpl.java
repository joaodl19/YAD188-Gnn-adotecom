package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Agendamento;
import com.br.adoteappapi.model.AgendamentoResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Repository
public class AgendamentoRepositoryImpl implements AgendamentoRepository{

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_SOLICITAR_AGENDAMENTO;
    private String QUERY_BUSCAR_AGENDAMENTOS_ONG;
    private String QUERY_APROVAR_AGENDAMENTO;
    private String QUERY_BUSCAR_AGENDAMENTOS_PET;
    public AgendamentoRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_SOLICITAR_AGENDAMENTO = "INSERT INTO public.agendamento(\n" +
                "\tds_status, id_pet, id_ong, id_cliente, dt_visita)\n" +
                "\tVALUES (?, ?, ?, ?, ?);";
        this.QUERY_BUSCAR_AGENDAMENTOS_ONG = "SELECT ag.ds_status, ag.id_agendamento, ag.dt_visita, cl.ds_nome as ds_nome_cliente,\n" +
                "pe.ds_nome as ds_nome_pet\n" +
                "\tFROM public.agendamento ag\n" +
                "\tINNER JOIN public.cliente cl\n" +
                "\tON ag.id_cliente = cl.id_cliente\n" +
                "\tINNER JOIN public.pet pe\n" +
                "\tON ag.id_pet = pe.id_pet\n" +
                "\tWHERE ag.id_ong = ?;";
        this.QUERY_APROVAR_AGENDAMENTO = "UPDATE public.agendamento\n" +
                "\tSET ds_status='Aguardando visita'\n" +
                "\tWHERE id_agendamento = ?;";
        this.QUERY_BUSCAR_AGENDAMENTOS_PET = "SELECT ag.id_cliente, ag.id_pet, ag.ds_status, ag.id_agendamento, ag.dt_visita, cl.ds_nome as ds_nome_cliente,\n" +
                "pe.ds_nome as ds_nome_pet\n" +
                "\tFROM public.agendamento ag\n" +
                "\tINNER JOIN public.cliente cl\n" +
                "\tON ag.id_cliente = cl.id_cliente\n" +
                "\tINNER JOIN public.pet pe\n" +
                "\tON ag.id_pet = pe.id_pet\n" +
                "\tWHERE ag.id_pet = ?;";
    }

    @Override
    public void solicitarAgendamento(Agendamento agendamento) {
        SimpleDateFormat dateIn = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat dateOut = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date dtVisita = new java.util.Date();
        try {
            dtVisita = dateIn.parse(agendamento.getDt_visita());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        var dtVisitaFinal = dateOut.format(dtVisita);
        jdbcTemplate.update(QUERY_SOLICITAR_AGENDAMENTO, rs -> {
            rs.setString(1, "Pendente");
            rs.setLong(2,agendamento.getId_pet());
            rs.setLong(3,agendamento.getId_ong());
            rs.setLong(4,agendamento.getId_cliente());
            rs.setDate(5, Date.valueOf(dtVisitaFinal));
        });
    }

    @Override
    public List<AgendamentoResponse> buscarAgendamentoOng(Long idOng) {

        List<AgendamentoResponse> listaAgendamento;
        listaAgendamento = jdbcTemplate.query(QUERY_BUSCAR_AGENDAMENTOS_ONG, (rs, rowNumber) ->
            new AgendamentoResponse(rs.getLong("id_agendamento"),
                    rs.getString("ds_status"),
                    rs.getString("dt_visita"),
                    rs.getString("ds_nome_cliente"),
                    rs.getString("ds_nome_pet"),
                    rs.getLong("id_cliente")),idOng);
        return listaAgendamento;
    }

    @Override
    public void aprovarAgendamento(Long idAgendamento) {
        jdbcTemplate.update(QUERY_APROVAR_AGENDAMENTO, idAgendamento);
    }

    @Override
    public AgendamentoResponse buscarAgendamentoPet(Long idPet) {
        AgendamentoResponse agendamento = new AgendamentoResponse();
        jdbcTemplate.query(QUERY_BUSCAR_AGENDAMENTOS_PET, rs -> {
            agendamento.setId_agendamento(rs.getLong("id_agendamento"));
            agendamento.setDs_status(rs.getString("ds_status"));
            agendamento.setDt_visita(rs.getString("dt_visita"));
            agendamento.setDs_nome_cliente(rs.getString("ds_nome_cliente"));
            agendamento.setDs_nome_pet(rs.getString("ds_nome_pet"));
            agendamento.setId_cliente(rs.getLong("id_cliente"));
            },idPet);
        return agendamento;
    }
}
