package com.br.adoteappapi.repositories;

import com.br.adoteappapi.model.UserLogin;

public interface LoginRepository {
    public UserLogin ValidarUsuarioESenha(UserLogin userLogin);
}
