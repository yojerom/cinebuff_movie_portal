package com.macnell.theatreservice.controller;

import com.macnell.theatreservice.model.Allocation;
import com.macnell.theatreservice.model.Theatre;
import com.macnell.theatreservice.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/TheatreService")
public class TheatreController
{
    @Autowired
    TheatreService theatreService;

    @RequestMapping(value = "/saveTheatre" , method = RequestMethod.POST)
    public Theatre save(@RequestBody Theatre theatre)
    {
        return theatreService.createTheatre(theatre);
    }

//    @RequestMapping(value = "/findbyid/{id}",method = RequestMethod.GET)
//    public List<Theatre> find(@PathVariable Integer id){
//        return theatreService.findById(id);
//    }

    //2.fetch all theatres
    @RequestMapping(value = "/fetchAllTheatres", method = RequestMethod.GET, produces = "application/json")
    public List<Theatre> fetchAll() {
        return theatreService.fetchAllTheatres();
    }

    //3.fetch theatre by id
    @RequestMapping(value = "fetchTheatreById/{id}", method = RequestMethod.GET)
    public Optional<Theatre> fetch(@PathVariable int id)
    {
        return theatreService.fetchTheatreById(id);
    }
}
