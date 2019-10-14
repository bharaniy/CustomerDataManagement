import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  customer = {};
  customerForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  cId: string = '';
  emailId: string = '';
  locatedCity: string = '';
  dOb: string = '';
  gender: string = '';
  phoneNumber: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
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
    this.getBook(this.route.snapshot.params['id']);
  }
  getBookDetails(Id) {
    this.api.getBook(Id)
      .subscribe(data => {
        console.log(data);
        this.customer = data;
      });
  }
  onFormSubmit(form: NgForm) {
    let id = this.route.snapshot.params['id'];
    console.log(form)
    this.api.updateBook(id, form)
      .subscribe(res => {
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
  getBook(Id) {
    this.api.getBook(Id).subscribe(data => {
      Id = data._id;
      console.log(data);
      this.customerForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      cId: data.cId,
      emailId: data.emailId,
      locatedCity: data.locatedCity,
      dOb: data.dOb,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      });
    });
  }
}
