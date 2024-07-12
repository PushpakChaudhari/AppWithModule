import { Component, Output,EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  title:string="";
  desc: string="";
  startTime: string = '';
  estimatedHours: number =1;

  @Output() todoAdd : EventEmitter<Todo> = new EventEmitter();
  constructor(){

  }
onSubmit(){
  
  const todo ={
    sno:8,
    title:this.title,
    desc:this.desc,

    startTime: this.startTime,
    estimatedHours: this.estimatedHours,


    active:true

  }
  this.todoAdd.emit(todo);

 
}
}
