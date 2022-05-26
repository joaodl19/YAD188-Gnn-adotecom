package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.Cliente;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.PreparedStatement;

@Repository
public class ClienteRepositoryImpl implements ClienteRepository{
    private final JdbcTemplate jdbcTemplate;
    private String QUERY_CADASTRAR_CLIENTE;
    private String QUERY_ATUALIZAR_DADOS_CLIENTE;
    private String QUERY_DELETAR_CLIENTE;
    private String QUERY_CONSULTAR_DADOS_CLIENTE;

    public ClienteRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_CADASTRAR_CLIENTE = "INSERT INTO public.cliente(ds_nome, nr_cpf_cnpj, dt_nascimento_fundacao," +
                "ds_genero, nr_telefone, nr_cep, ds_logradouro, ds_cidade, ds_deficiencia, ds_obs, ds_email, ds_senha, tx_foto)" +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        this.QUERY_ATUALIZAR_DADOS_CLIENTE = "UPDATE public.cliente " +
                "SET ds_nome=?, dt_nascimento_fundacao=?, ds_genero=?, nr_telefone=?, nr_cep=?, ds_logradouro=?, ds_cidade=?, ds_deficiencia=?, ds_obs=?, ds_email=?, ds_senha=?, tx_foto=?" +
                " WHERE nr_cpf_cnpj = ?";
        this.QUERY_DELETAR_CLIENTE = "DELETE FROM public.cliente WHERE nr_cpf_cnpj = ?";
        this.QUERY_CONSULTAR_DADOS_CLIENTE = "SELECT id_cliente, ds_nome, nr_cpf_cnpj, dt_nascimento_fundacao," +
                " ds_genero, nr_telefone, nr_cep, ds_logradouro, ds_cidade, ds_deficiencia, ds_obs, ds_email, tx_foto" +
                " FROM public.cliente WHERE nr_cpf_cnpj = ?";

    }


    @Override
    public void cadastrarCliente(Cliente cliente) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest algoritimo = MessageDigest.getInstance("MD5");
        byte messageDigest[] = algoritimo.digest(cliente.getDs_senha().getBytes("UTF-8"));
        String senha = new String(messageDigest,"UTF-8");
        jdbcTemplate.update(connection -> {
        PreparedStatement ps = connection
                    .prepareStatement(QUERY_CADASTRAR_CLIENTE);
                    ps.setString(1, cliente.getDs_nome());
                    ps.setString(2, cliente.getNr_cpf_cnpj());
                    ps.setDate(3, Date.valueOf(cliente.getDt_nascimento_fundacao()));
                    ps.setString(4, cliente.getDs_genero());
                    ps.setBigDecimal(5, cliente.getNr_telefone());
                    ps.setString(6, cliente.getNr_cep());
                    ps.setString(7, cliente.getDs_logradouro());
                    ps.setString(8, cliente.getDs_cidade());
                    ps.setString(9, String.valueOf(cliente.getDs_deficiencia()));
                    ps.setString(10,cliente.getDs_obs());
                    ps.setString(11,cliente.getDs_email());
                    ps.setString(12, senha);
                    ps.setBytes(13, cliente.getTx_foto());
                    return ps;
        });
    }

    @Override
    public void atualizarDadosCliente(String cpf, Cliente cliente) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(QUERY_ATUALIZAR_DADOS_CLIENTE);
            ps.setString(1, cliente.getDs_nome());
            ps.setDate(2, Date.valueOf(cliente.getDt_nascimento_fundacao()));
            ps.setString(3, cliente.getDs_genero());
            ps.setBigDecimal(4, cliente.getNr_telefone());
            ps.setString(5, cliente.getNr_cep());
            ps.setString(6, cliente.getDs_logradouro());
            ps.setString(7, cliente.getDs_cidade());
            ps.setString(8, String.valueOf(cliente.getDs_deficiencia()));
            ps.setString(9,cliente.getDs_obs());
            ps.setString(10,cliente.getDs_email());
            ps.setString(11, cliente.getDs_senha());
            ps.setBytes(12, cliente.getTx_foto());
            ps.setString(13, cpf);
            return ps;
        });
    }

    @Override
    public void deletarCliente(String cpf) {
        jdbcTemplate.update(QUERY_DELETAR_CLIENTE, cpf);
    }

    @Override
    public Cliente consultarDadosCliente(String cpf) {
        Cliente cliente = new Cliente();
        jdbcTemplate.query(QUERY_CONSULTAR_DADOS_CLIENTE, rs -> {
            cliente.setId_cliente(rs.getLong("id_cliente"));
            cliente.setDs_nome(rs.getString("ds_nome"));
            cliente.setNr_cpf_cnpj(rs.getString("nr_cpf_cnpj"));
            cliente.setDt_nascimento_fundacao(rs.getString("dt_nascimento_fundacao"));
            cliente.setDs_genero(rs.getString("ds_genero"));
            cliente.setNr_telefone(rs.getBigDecimal("nr_telefone"));
            cliente.setNr_cep(rs.getString("nr_cep"));
            cliente.setDs_logradouro(rs.getString("ds_logradouro"));
            cliente.setDs_cidade(rs.getString("ds_cidade"));
            cliente.setDs_deficiencia(rs.getString("ds_deficiencia"));
            cliente.setDs_obs(rs.getString("ds_obs"));
            cliente.setDs_email(rs.getString("ds_email"));
            cliente.setTx_foto(rs.getBytes("tx_foto"));
            cliente.setDs_senha("*******");
        },cpf);
        return cliente;
    }
}