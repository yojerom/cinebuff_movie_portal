package com.macnell.theatreservice.service;

import com.macnell.theatreservice.model.Allocation;
import com.macnell.theatreservice.model.Theatre;
import com.macnell.theatreservice.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheatreServiceImpl implements TheatreService {
    @Autowired
    TheatreRepository theatreRepository;

    @Override
    public Theatre createTheatre(Theatre theatre)
    {
        return theatreRepository.save(theatre);
    }


//    public List<Theatre> findById(Integer id) {
//
//        Theatre theatre = new Theatre();
//        theatre.setId(id);
//        Example<Theatre> theatreExample = Example.of(theatre);
//        return theatreRepository.findAll(theatreExample);
//    }

    //2.fetch all theatres
    @Override
    public List<Theatre> fetchAllTheatres() {
        return theatreRepository.findAll();
    }

    //3.fetch theatre by id
    @Override
    public Optional<Theatre> fetchTheatreById(int id) {
        return theatreRepository.findById(id);
    }
}
