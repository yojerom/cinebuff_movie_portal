package com.macnell.theatreservice.service;

import com.macnell.theatreservice.model.Allocation;
import com.macnell.theatreservice.model.Theatre;

import java.util.List;
import java.util.Optional;

public interface TheatreService {

    //1.save theatre
    Theatre createTheatre(Theatre theatre);

    //2.fetch all theatres
    List<Theatre> fetchAllTheatres();

    //3.fetch theatre by id
    Optional<Theatre> fetchTheatreById(int id);


}
