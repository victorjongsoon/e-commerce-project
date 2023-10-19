package com.learn2code.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import com.learn2code.ecommerce.dto.Purchase;
import com.learn2code.ecommerce.dto.PurchaseResponse;
import com.learn2code.ecommerce.service.CheckoutService;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}
