package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.LoginResponse;
import com.br.adoteappapi.model.UserLogin;
import com.br.adoteappapi.repositories.LoginRepository;
import com.br.adoteappapi.repositories.LoginRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Controller
@RequestMapping("/login")

public class LoginController {

    @Autowired
    LoginRepositoryImpl loginRepository;

    @PostMapping
    public ResponseEntity<LoginResponse> loginCliente(@RequestBody UserLogin userLogin) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        LoginResponse response = new LoginResponse();
        var user = loginRepository.ValidarUsuarioESenha(userLogin);

        MessageDigest algoritimo = MessageDigest.getInstance("MD5");
        byte messageDigest[] = algoritimo.digest(userLogin.getSenha().getBytes("UTF-8"));
        String senha = new String(messageDigest,"UTF-8");
        System.out.println("CPF: "+userLogin.getCpf());
        System.out.println("SENHA: "+userLogin.getSenha());
        if(user.getCpf() == null){
            response.setCodigo(2l);
            response.setMensagem("Usuario não existe");
        }else {
            if (user.getSenha().equals(senha)) {
                response.setCodigo(1l);
                response.setMensagem("Usuario logado com Sucesso");
            } else {
                response.setCodigo(0l);
                response.setMensagem("Usuario ou senha inválida");
            }
        }
        return ResponseEntity.ok(response);
    }
}
