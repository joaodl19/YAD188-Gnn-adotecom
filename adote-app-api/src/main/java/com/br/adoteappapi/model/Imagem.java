package com.br.adoteappapi.model;

import lombok.Getter;
import lombok.Setter;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Getter
@Setter
public class Imagem {

    private String nome;
    private String formato;
    private byte[] imagem;
}
