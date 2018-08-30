import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import * as $ from 'jquery';

// Error when invalid control is dirty, touched, or submitted.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Web personal';

  contactForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', [ Validators.email, Validators.required ]);
  message = new FormControl('', Validators.required);

  matcher = new MyErrorStateMatcher();

  data: any;

  calculateAge = function calculateAge () {
    return new Date(Date.now() - new Date(1991, 4, 5).getTime()).getFullYear() - 1970;
  };

  urlEncoded(object) {
    const str = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(element));
      }
    }
    return str.join('&');
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message
    });
  }

  onSubmit() {
    this.data = this.urlEncoded(this.contactForm.value);
    console.log(this.data);
    if (this.contactForm.valid) {
      $.post({
        url: 'https://formspree.io/adrianarroyoceja@gmail.com',
        data: this.data,
        success: function(data, textStatus, jqXHR) {
          console.log(data, textStatus, jqXHR);
        },
        dataType: 'application/x-www-form-urlencoded'
      }).then(function(response) {
        window.alert('Tu mensaje fue enviado :)');
        this.contactForm.reset();
        console.log(response);
      }).catch(function(error) {
        window.alert('Tu mensaje no fue enviado :(');
        console.log(error);
      });
    }
  }

  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }
}
