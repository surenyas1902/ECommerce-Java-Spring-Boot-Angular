import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { Info } from 'src/app/common/info';
import { State } from 'src/app/common/state';
import { ShopFormServiceService } from 'src/app/services/shop-form-service.service';

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

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormServiceService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.shopFormService.getCountries().subscribe(data => this.countries = data);
    this.shopFormService.getStates("IN").subscribe(data => this.states = data);
  }

  initializeForm() {
    const startMonth: number = new Date().getMonth() + 1;
    const startYear: number = new Date().getFullYear();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['Visa'],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [startMonth],
        expirationYear: [startYear],
      }),
    });

    
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => this.months = data);
    this.shopFormService.getCreditCardYears().subscribe(data => this.years = data);
  }

  onSubmit() {
    console.log("Form Submitted\n");
    //console.log(this.checkoutFormGroup.get('customer')?.value);
    let information: Info = this.checkoutFormGroup.getRawValue() as Info;
    console.log(information);
  }

  copyShippingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
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

}
