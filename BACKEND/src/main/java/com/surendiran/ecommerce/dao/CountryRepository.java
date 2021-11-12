package com.surendiran.ecommerce.dao;

import com.surendiran.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "countries")
@CrossOrigin("http://localhost:4200")
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
