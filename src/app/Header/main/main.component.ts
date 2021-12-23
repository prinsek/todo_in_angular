import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/app/type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    Adata:Data[]
    currentUser:string;
    
    registerTodo:FormGroup;
  constructor(private router:Router) {
   
    this.currentUser=sessionStorage.getItem("user");
    if(localStorage.getItem(this.currentUser)==null){
      this.Adata=[]
    }else{
      this.Adata=JSON.parse(localStorage.getItem(this.currentUser))
    }   
  }


  ngOnInit(): void {
  }

  pushvalue(task:Data){
    this.Adata.push(task);
    // sessionStorage.setItem('user',this.registerTodo.get('').value)
    localStorage.setItem(this.currentUser,JSON.stringify(this.Adata));
    // this.router.navigate([''])

  }
  delete(i){
    this.Adata.splice(i,1);
    localStorage.setItem(this.currentUser,JSON.stringify(this.Adata));
  }
  
}