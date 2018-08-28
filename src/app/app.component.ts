import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  calculateAge = function calculateAge () {
    return new Date(Date.now() - new Date(1991, 4, 5).getTime()).getFullYear() - 1970;
  };

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(
        'https://formspree.io/adrianarroyoceja@gmail.com',
        this.contactForm,
        { headers: headers }
      );
      window.alert('Mensaje enviado');
      this.contactForm.reset();
    }
  }

  constructor(private elementRef: ElementRef, public http: HttpClient) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }
}
