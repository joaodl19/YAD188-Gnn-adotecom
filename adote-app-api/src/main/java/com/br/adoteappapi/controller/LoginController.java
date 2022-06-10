package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.LoginResponse;
import com.br.adoteappapi.model.UserLogin;
import com.br.adoteappapi.repositories.LoginRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Controller
@RequestMapping("/login")

public class LoginController {

    @Autowired
    LoginRepositoryImpl loginRepository;
    Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping
    public ResponseEntity<LoginResponse> loginCliente(@RequestBody UserLogin userLogin) throws NoSuchAlgorithmException {
        logger.info("Login solicitado");
        LoginResponse response = new LoginResponse();
        logger.info("Validando usuário e senha");
        var user = loginRepository.ValidarUsuarioESenha(userLogin);
        MessageDigest algoritimo = MessageDigest.getInstance("MD5");
        byte[] messageDigest = algoritimo.digest(userLogin.getSenha().getBytes(StandardCharsets.UTF_8));
        String senha = new String(messageDigest, StandardCharsets.UTF_8);
        if(user.getCpf() == null){
            response.setCodigo(2L);
            response.setMensagem("Usuario não existe");
            logger.info("Usuário não existe");
        }else {
            if (user.getSenha().equals(senha)) {
                response.setCodigo(1L);
                response.setMensagem("Usuario logado com Sucesso");
                logger.info("Usuário logado com Sucesso");
            } else {
                response.setCodigo(0L);
                response.setMensagem("Usuario ou senha inválida");
                logger.info("Usuário ou senha inválida");
            }
        }
        return ResponseEntity.ok(response);
    }
}
