import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Info } from 'src/app/common/info';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormServiceService } from 'src/app/services/shop-form-service.service';
import { Validator } from 'src/app/validators/validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  years: number[] = [];
  months: number[] = [];
  countries: Array<Country> = new Array<Country>();
  states: Array<State> = new Array<State>();

  shippingAddressStates: State[] = new Array<State>();
  sbillingAddressStates: State[] = new Array<State>();

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormServiceService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.shopFormService.getCountries().subscribe(data => this.countries = data);
    this.shopFormService.getStates("IN").subscribe(data => this.states = data);
    this.reviewCartDetails();
  }

  initializeForm() {
    const startMonth: number = new Date().getMonth() + 1;
    const startYear: number = new Date().getFullYear();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        country: new FormControl('', [
          Validators.required
        ]),
        zipcode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        country: new FormControl('', [
          Validators.required
        ]),
        zipcode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('Visa', [
          Validators.required
        ]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validator.checkWhiteSpace
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}')
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}')
        ]),
        expirationMonth: new FormControl(startMonth),
        expirationYear: new FormControl(startYear),
      }),
    });


    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => this.months = data);
    this.shopFormService.getCreditCardYears().subscribe(data => this.years = data);
  }

  onSubmit() {
    //console.log(this.checkoutFormGroup.get('customer')?.value);
    let information: Info = this.checkoutFormGroup.getRawValue() as Info;
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // setup order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = [];
    cartItems.forEach(data => orderItems.push(new OrderItem(data)));

    // setup purchases
    let purchase = new Purchase();

    //populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingState.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe((data) => {
      alert(`Your order has been received.\nOrder tracking number: ${data.orderTrackingNumber}`);

      // reset the cart
      this.resetCart();
    }, (error) => {
      console.log(error);
      alert(`There was an error: ${error.message}`);
    });
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl('/products');
  }

  copyShippingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.sbillingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.sbillingAddressStates = new Array<State>();
    }
  }

  changeYear() {
    const selectedYear = this.checkoutFormGroup.get('creditCard')?.value.expirationYear;
    const currentYear = new Date().getFullYear();
    let startMonth = new Date().getMonth() + 1;
    if (selectedYear > currentYear) {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => this.months = data);
  }

  getStates(groupName: string) {
    const formGroup = this.checkoutFormGroup.get(groupName);
    console.dir(formGroup?.value);
    const countryCode = formGroup?.value.country;
    const countryName = formGroup?.value.country;

    this.shopFormService.getStates(countryCode).subscribe(data => {
      if (groupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      }
      else {
        this.sbillingAddressStates = data;
      }

      formGroup?.get('state')?.setValue("");
    })
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      console.log('price' + data);
      this.totalPrice = data;
    });
    this.cartService.totalQuantity.subscribe(data => {
      console.log('quantity' + data);
      this.totalQuantity = data
    });
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipcode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipcode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardName() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

}
