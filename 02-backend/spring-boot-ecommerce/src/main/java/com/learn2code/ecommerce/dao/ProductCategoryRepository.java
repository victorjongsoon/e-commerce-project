package com.learn2code.ecommerce.dao;

import com.learn2code.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category") // remove the default s
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
