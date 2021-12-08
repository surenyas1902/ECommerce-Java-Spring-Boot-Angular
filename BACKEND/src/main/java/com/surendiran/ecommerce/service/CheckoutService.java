package com.surendiran.ecommerce.service;

import com.surendiran.ecommerce.dto.Purchase;
import com.surendiran.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeHolder(Purchase purchase);
}
