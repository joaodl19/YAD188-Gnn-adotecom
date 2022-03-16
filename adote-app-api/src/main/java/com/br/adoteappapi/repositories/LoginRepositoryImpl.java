package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.UserLogin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

    private final JdbcTemplate jdbcTemplate;
    private String QUERY_BUSCAR_USUARIO_E_SENHA;

    public LoginRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.QUERY_BUSCAR_USUARIO_E_SENHA = "SELECT nr_cpf_cnpj, ds_senha FROM public.cliente WHERE nr_cpf_cnpj = ?";
    }

    @Override
    public UserLogin ValidarUsuarioESenha(UserLogin userLogin) {
        UserLogin user = new UserLogin();
        jdbcTemplate.query(QUERY_BUSCAR_USUARIO_E_SENHA, rs -> {
                user.setCpf(rs.getString("nr_cpf_cnpj"));
                user.setSenha(rs.getString("ds_senha"));
            },userLogin.getCpf());

        return user;
    }
}
