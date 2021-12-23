import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fdata } from 'src/app/formdata';
// import { MustMatch } from 'src/app/must_match';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  Name: string;
  Email: Text;
  Password: Text;
  registerForm: FormGroup;
  submitted = false;
  Formdata: fdata[];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    if (localStorage.getItem('userdetail') == null) {
      this.Formdata = [];
    } else {
      this.Formdata = JSON.parse(localStorage.getItem('userdetail'));
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        Name: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern('[a-zA-Z ]*'),
          ],
        ],
        Email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        Password: [
          '',
          [
            Validators.required,
          
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{4,10}'
            ),
          ],
        ],
        // cPassword: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(5),
        //     Validators.pattern(
        //       '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
        //     ),
        //   ],
        // ],
        // acceptTerms: [false, Validators.requiredTrue],
      },
      {
        // validator: MustMatch('password', 'cPassword')
      }
    );
  }
  get f() {
    return this.registerForm.controls;
  }

  Register() {
    
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.invalid);
      
      return;
    }
    for(let i=0;i<this.Formdata.length;i++){
      if(this.Formdata[i].Email==this.registerForm.get('Email').value){
        
      alert("you have already registered")
        return;
      }
    }
    const fdata = {
      Name: this.registerForm.value.Name,
      Email: this.registerForm.value.Email,
      Password: this.registerForm.value.Password,
    };
    this.Formdata.push(fdata);
    localStorage.setItem('userdetail', JSON.stringify(this.Formdata));
    sessionStorage.setItem("user",this.registerForm.get('Email').value)
    alert("your details is registered")
    this.router.navigate([''])
    
  }
}
