import { Address } from './address';
import { CreditCard } from './credit-card';
import { Customer } from './customer';

export class Info {
    customer: Customer;
    shippingAddress: Address;
    billingAddress: Address;
    creditCard: CreditCard;
}
