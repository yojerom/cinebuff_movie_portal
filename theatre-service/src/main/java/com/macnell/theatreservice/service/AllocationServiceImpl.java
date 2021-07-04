package com.macnell.theatreservice.service;

import com.macnell.theatreservice.model.Allocation;
import com.macnell.theatreservice.repository.AllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllocationServiceImpl implements AllocationService {
    @Autowired
    AllocationRepository allocationRepository;

    //1.save the allocation
    @Override
    public Allocation createAllocation(Allocation allocation) {
        return allocationRepository.save(allocation);
    }

    //2.fetch allocation by movie id
    @Override
    public List<Allocation> findById(Integer id) {
        Allocation allocation = new Allocation();
        allocation.setMovId(id);
        Example<Allocation> allocationExample = Example.of(allocation);
        return allocationRepository.findAll(allocationExample);
    }

    //3.fetch all allocations
    @Override
    public List<Allocation> fetchAllAllocations() {
        return allocationRepository.findAll();
    }

    //4.fetch allocation by id
    @Override
    public Optional<Allocation> fetchAllocationById(int id) {
        return allocationRepository.findById(id);
    }

    //5.delete allocation by id
    @Override
    public Allocation deleteAllocation(int id) {
        Optional<Allocation> allocation = allocationRepository.findById(id);
        if(allocation.isPresent()) {
            allocationRepository.deleteById(id);
            return allocation.get();
        }
        return null;
    }
}
