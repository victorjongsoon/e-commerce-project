package com.learn2code.ecommerce.service;

import com.learn2code.ecommerce.dto.Purchase;
import com.learn2code.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    

    PurchaseResponse placeOrder(Purchase purchase);

    
}
