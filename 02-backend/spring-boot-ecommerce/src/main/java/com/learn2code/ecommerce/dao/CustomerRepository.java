package com.learn2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn2code.ecommerce.entity.Customer;

// customer have a collection of order
// when purchase come accross, it will grab the customer, assemble according
// and then save the actual customer using his customer repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
