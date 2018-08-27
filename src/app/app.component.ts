import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  calculateAge = function calculateAge () {
    return new Date(Date.now() - new Date(1991, 4, 5).getTime()).getFullYear() - 1970;
  };

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      comments: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, comments } = this.contactForm.value;
      console.log( 'mailchimp' );
      this.contactForm.reset();
    }
  }

  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }
}
