package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class QuestionarioRepositoryImpl {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_BUSCAR_PERGUNTAS;
    private String QUERY_BUSCAR_RESPOSTAS;
    private String QUERY_INSERIR_QUESTIONARIO;
    private String QUERY_BUSCAR_QUESTIONARIO_CLIENTE;

    public QuestionarioRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_BUSCAR_PERGUNTAS = "SELECT id_pergunta, ds_pergunta\n" +
                "\tFROM public.perguntas;";
        this.QUERY_BUSCAR_RESPOSTAS = "SELECT id_resposta, id_pergunta, ds_resposta\n" +
                "\tFROM public.resposta;";
        this.QUERY_INSERIR_QUESTIONARIO = "INSERT INTO public.questionario(id_cliente, perguntas, respostas) VALUES (?, ?, ?)";
        this.QUERY_BUSCAR_QUESTIONARIO_CLIENTE = "SELECT * FROM public.questionario WHERE id_cliente = ?";
    }

    public List<QuestionarioResponseCliente> buscarQuestionarioCliente(Long idCliente){
        var quest = new Object() {
            String respostasCliente;
            String perguntasCliente;
        };
        jdbcTemplate.query(QUERY_BUSCAR_QUESTIONARIO_CLIENTE, rs -> {
            quest.perguntasCliente = rs.getString("perguntas");
            quest.respostasCliente = rs.getString("respostas");
        },idCliente);

        List<QuestionarioResponseCliente> questionario = new ArrayList<>();
        List<Pergunta> perguntas = new ArrayList<>();
        perguntas = jdbcTemplate.query(QUERY_BUSCAR_PERGUNTAS,(rs, rowNumber) -> new Pergunta(
                rs.getLong("id_pergunta"),
                rs.getString("ds_pergunta"))
        );
        var listaPerguntaCliente = quest.perguntasCliente.split(";");

        var listaRespostaCliente = quest.respostasCliente.split(";");

        for(String nrPergCliente : listaPerguntaCliente){
            QuestionarioResponseCliente questionarioResponse = new QuestionarioResponseCliente();
            questionarioResponse.setPergunta(perguntas.get(Integer.parseInt(nrPergCliente) - 1).getDs_pergunta());
            questionarioResponse.setRespostas(listaRespostaCliente[Integer.parseInt(nrPergCliente) - 1]);
            questionario.add(questionarioResponse);
        }
        System.out.println(questionario);
        return questionario;

    }
    public List<QuestionarioResponse> buscarQuestionario(){
        List<QuestionarioResponse> questionario = new ArrayList<>();
        List<Pergunta> perguntas = new ArrayList<>();
        List<Resposta> respostas = new ArrayList<>();
        perguntas = jdbcTemplate.query(QUERY_BUSCAR_PERGUNTAS,(rs, rowNumber) -> new Pergunta(
                rs.getLong("id_pergunta"),
                rs.getString("ds_pergunta"))
        );
        respostas = jdbcTemplate.query(QUERY_BUSCAR_RESPOSTAS,(rs, rowNumber) -> new Resposta(
                rs.getLong("id_resposta"),
                rs.getLong("id_pergunta"),
                rs.getString("ds_resposta"))
        );
        for(Pergunta pergunta:perguntas){
            QuestionarioResponse questionarioResponse = new QuestionarioResponse();
            List<Resposta> listaResposta = new ArrayList<>();
            questionarioResponse.setPergunta(pergunta);
            for (Resposta resposta: respostas){
                if(resposta.getId_pergunta() == pergunta.getId_pergunta()){
                    listaResposta.add(resposta);
                }
                questionarioResponse.setRespostas(listaResposta);
            }
            questionario.add(questionarioResponse);
        }

        return questionario;
    }

    public int inserirQuestionario(Long id, List<RespostasQuestionario> respostasQuestionarios) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String perguntas = "";
        String respostas = "";
        for(RespostasQuestionario resp : respostasQuestionarios){
            if(perguntas == ""){
                perguntas = "" + resp.getId_pergunta();
            }else{
                perguntas = perguntas + ";" + resp.getId_pergunta();
            }
            if( respostas == ""){
                respostas = "" + resp.getDs_resposta();
            }else{
                respostas = respostas + ";" + resp.getDs_resposta();
            }
        }
        String perguntasFinal = perguntas;
        String respostasFinal = respostas;
        jdbcTemplate.update(connection -> {
                   PreparedStatement ps = connection
                           .prepareStatement(QUERY_INSERIR_QUESTIONARIO, Statement.RETURN_GENERATED_KEYS);
                   ps.setLong(1, id);
                   ps.setString(2, perguntasFinal);
                   ps.setString(3, respostasFinal);
                   return ps;
        },keyHolder);
       return (int) keyHolder.getKeys().get("id_questionario");
    }
}
