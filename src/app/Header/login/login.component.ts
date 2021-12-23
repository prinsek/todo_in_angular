import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginc } from 'src/app/logincheck';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logincheck:loginc[]
  email: Text;
  password: Text;
  submitted=false;
  register:FormGroup;
  constructor( private router: Router, private formBuilder:FormBuilder) { 
   
    if(localStorage.getItem("userdetail")==null){
      this.logincheck=[]
    }else{
      this.logincheck=JSON.parse(localStorage.getItem("userdetail"))  
    }
  }


  ngOnInit() { this.register = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(2),Validators.pattern]],
    // acceptTerms: [false, Validators.requiredTrue]
}, );
  }
  
  get f() { return this.register.controls; }
  
  login(){
    // console.log(this.logincheck)
    this.submitted=true;
    for(let i=0;i<this.logincheck.length;i++){
      if(this.logincheck[i].Email==this.register.get('email').value){
        if(this.logincheck[i].Password==this.register.get('password').value)
        {
          sessionStorage.setItem("user",this.register.get('email').value)
          this.router.navigate(['todo']);
        }else{
          alert("invalid user! Please register")
        }
      }
    }
  }
}
