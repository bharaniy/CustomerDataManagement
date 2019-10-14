import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  customerForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  id: string = '';
  emailId: string = '';
  locatedCity: string = '';
  dOb: string = '';
  gender: string = '';
  phoneNumber: string = '';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'cId': [null, Validators.required],
      'emailId': [null, Validators.required],
      'locatedCity': [null, Validators.required],
      'dOb': [null, Validators.required],
      'gender': [null, Validators.required],
      'phoneNumber': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
