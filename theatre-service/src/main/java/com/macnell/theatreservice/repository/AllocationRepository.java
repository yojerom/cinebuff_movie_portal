package com.macnell.theatreservice.repository;

import com.macnell.theatreservice.model.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllocationRepository extends JpaRepository<Allocation,Integer> {
}
