package com.surendiran.ecommerce.dto;

import com.surendiran.ecommerce.entity.Address;
import com.surendiran.ecommerce.entity.Customer;
import com.surendiran.ecommerce.entity.Order;
import com.surendiran.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
