package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class Cliente {
    private Long id_cliente;
    private String ds_nome;
    private String nr_cpf_cnpj;
    private String dt_nascimento_fundacao;
    private String ds_genero;
    private BigDecimal nr_telefone;
    private String nr_cep;
    private String ds_logradouro;
    private String ds_cidade;
    private String ds_deficiencia;
    private String ds_obs;
    private String ds_email;
    private String ds_senha;
    private byte[] tx_foto;
}
