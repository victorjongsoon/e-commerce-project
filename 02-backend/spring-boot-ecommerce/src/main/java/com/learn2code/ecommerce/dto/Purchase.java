package com.learn2code.ecommerce.dto;
// dto - data transfer object

import java.util.Set;

import com.learn2code.ecommerce.entity.Address;
import com.learn2code.ecommerce.entity.Customer;
import com.learn2code.ecommerce.entity.Order;
import com.learn2code.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
