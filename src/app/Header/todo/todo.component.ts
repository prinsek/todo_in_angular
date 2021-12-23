import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Data} from 'src/app/type';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  item:string;
  desc:string;
  registerTodo:FormGroup;
  submitted=false;
  @Output() add:EventEmitter<Data> =new EventEmitter();
  constructor(private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit() { this.registerTodo = this.formBuilder.group({
    item: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    desc: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acceptTerms: [false, Validators.requiredTrue]
},);
  }
  get f() { return this.registerTodo.controls; }
  onSubmit(){
    
    this.submitted=true;
    const check={
      title:this.registerTodo.value.item,
      desc:this.registerTodo.value.desc,
      active:true,
    }
    this.add.emit(check); 
  }
close(){
 this.router.navigate([''])
}

}
