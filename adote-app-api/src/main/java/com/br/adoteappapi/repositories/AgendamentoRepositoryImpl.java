package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Agendamento;
import com.br.adoteappapi.model.AgendamentoResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class AgendamentoRepositoryImpl implements AgendamentoRepository{

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_SOLICITAR_AGENDAMENTO;
    private String QUERY_BUSCAR_AGENDAMENTOS_ONG;
    private String QUERY_APROVAR_AGENDAMENTO;

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
                "\tSET ds_status='Confirmado'\n" +
                "\tWHERE id_agendamento = ?;";
    }

    @Override
    public void solicitarAgendamento(Agendamento agendamento) {
        System.out.println("OKKKKKKKKKKKKKKK");
        jdbcTemplate.update(QUERY_SOLICITAR_AGENDAMENTO, rs -> {
            rs.setString(1, "Pendente");
            rs.setLong(2,agendamento.getId_pet());
            rs.setLong(3,agendamento.getId_ong());
            rs.setLong(4,agendamento.getId_cliente());
            rs.setDate(5, Date.valueOf(agendamento.getDt_visita()));
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
                    rs.getString("ds_nome_pet")),idOng);
        return listaAgendamento;
    }

    @Override
    public void aprovarAgendamento(Long idAgendamento) {
        jdbcTemplate.update(QUERY_APROVAR_AGENDAMENTO, idAgendamento);
    }
}
