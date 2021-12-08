package com.surendiran.ecommerce.service;

import com.surendiran.ecommerce.dao.CustomerRepository;
import com.surendiran.ecommerce.dto.Purchase;
import com.surendiran.ecommerce.dto.PurchaseResponse;
import com.surendiran.ecommerce.entity.Customer;
import com.surendiran.ecommerce.entity.Order;
import com.surendiran.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeHolder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItem
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billing Address and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        //generate a random UUID number

        return UUID.randomUUID().toString();
    }
}
