package com.surendiran.ecommerce.controller;

import com.surendiran.ecommerce.dto.Purchase;
import com.surendiran.ecommerce.dto.PurchaseResponse;
import com.surendiran.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return this.checkoutService.placeHolder(purchase);
    }
}
