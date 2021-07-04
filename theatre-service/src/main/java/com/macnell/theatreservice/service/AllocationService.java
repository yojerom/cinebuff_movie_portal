package com.macnell.theatreservice.service;

import com.macnell.theatreservice.model.Allocation;

import java.util.List;
import java.util.Optional;

public interface AllocationService {

    //1.save the allocation
    Allocation createAllocation(Allocation allocation);

    //2.fetch allocation by movie id
    List<Allocation> findById(Integer id);

    //3.fetch all allocations
    List<Allocation> fetchAllAllocations();

    //4.fetch allocation by id
    Optional<Allocation> fetchAllocationById(int id);

    //5.delete allocation by id
    Allocation deleteAllocation(int id);
}
