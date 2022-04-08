package br.com.adotecom.adoteapi.controller;

import br.com.adotecom.adoteapi.dto.ClienteDto;
import br.com.adotecom.adoteapi.dto.OngDto;
import br.com.adotecom.adoteapi.model.Ong;
import br.com.adotecom.adoteapi.repository.OngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ong")
public class OngController {
    @Autowired
    OngRepository ongRepository;

    @PostMapping
    public void cadastrarOng(@RequestBody OngDto ong){
        ongRepository.save(OngDto.toOng(ong));

    }
}
