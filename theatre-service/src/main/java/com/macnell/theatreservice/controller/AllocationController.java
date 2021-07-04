package com.macnell.theatreservice.controller;

import com.macnell.theatreservice.model.Allocation;
import com.macnell.theatreservice.model.Theatre;
import com.macnell.theatreservice.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/AllocationService")
public class AllocationController
{
    @Autowired
    AllocationService allocationService;

    //1.save the allocation
    @RequestMapping(value = "/saveAllocation", method = RequestMethod.POST)
    public Allocation save(@RequestBody Allocation allocation) {
        return allocationService.createAllocation(allocation);
    }

    //2.fetch allocation by movie id
    @RequestMapping(value = "/fetchAllocationByMovieId/{id}", method = RequestMethod.GET)
    public List<Allocation> findbyid(@PathVariable Integer id) {
        return allocationService.findById(id);
    }

    //3.fetch all allocations
    @RequestMapping(value = "/fetchAllAllocations", method = RequestMethod.GET, produces = "application/json")
    public List<Allocation> fetchAll() {
        return allocationService.fetchAllAllocations();
    }

    //4.fetch allocation by id
    @RequestMapping(value = "fetchAllocationById/{id}", method = RequestMethod.GET)
    public Optional<Allocation> fetch(@PathVariable int id)
    {
        return allocationService.fetchAllocationById(id);
    }

    //5.delete allocation by id
    @RequestMapping(value = "/deleteAllocation/{id}", method = RequestMethod.DELETE)
    public Allocation delete(@PathVariable int id) {
        return allocationService.deleteAllocation(id);}
    }