package com.br.adoteappapi.controller;

import com.br.adoteappapi.model.Imagem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/imagem")
public class ImagemController {


    @GetMapping
    public Imagem imagem() throws IOException {
        Imagem imagem = new Imagem();
        imagem.setFormato("jpg");
        imagem.setNome("Cachorro");
        String imagePath = "C:\\Users\\joao-\\OneDrive\\Documentos\\adote-app-api\\src\\main\\resources\\cachorro.jpg";
        BufferedImage minhaImagem = ImageIO.read(new File(imagePath));
        System.out.println(imagePath);
        ByteArrayOutputStream imagemByte = new ByteArrayOutputStream();
        ImageIO.write(minhaImagem,"jpg",imagemByte);
        byte[] imagemEmByte = imagemByte.toByteArray();
        imagem.setImagem(imagemEmByte);
        return imagem;
    }
}
