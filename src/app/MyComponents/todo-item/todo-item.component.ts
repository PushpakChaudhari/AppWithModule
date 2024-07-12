import { Component, Input, Output,EventEmitter, OnInit,OnDestroy } from '@angular/core';

import { Todo } from '../../Todo';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent  implements OnInit, OnDestroy{
@Input() todo! : Todo;
@Input() i! :number;
@Output() todoDelete : EventEmitter<Todo>= new EventEmitter();
@Output() todoCheckbox : EventEmitter<Todo>= new EventEmitter();

private checkInterval: any;

ngOnInit() {
  this.startChecking();
}

ngOnDestroy() {
  clearInterval(this.checkInterval); // Clear the interval on component destroy
}


startChecking() {
  this.checkInterval = setInterval(() => {
    this.checkCompletion();
  }, 60000); // Check every minute
}





onClick(todo : Todo){
  this.todoDelete.emit(this.todo);
  console.log("OnClick Trigered")
}

onCheckboxClick(todo:Todo){
  console.log(todo);
  this.todoCheckbox.emit(todo);
}


isStartingSoon(): boolean {
  const startTime = new Date(this.todo.startTime);
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  return startTime <= oneHourFromNow && startTime > now;
}




checkCompletion() {
  const startTime = new Date(this.todo.startTime);
  const estimatedHours = this.todo.estimatedHours || 1; // Default to 0 if null
  const endTime = new Date(startTime.getTime() + estimatedHours * 60 * 60 * 1000);
  const now = new Date();

  const fiveMinutesLater = new Date(endTime.getTime() + 5 * 60 * 1000);

  if (now >= endTime && now <= fiveMinutesLater) {
    clearInterval(this.checkInterval); // Stop checking after completion
    this.confirmCompletion();
  }
}

confirmCompletion() {
  const completed = confirm(`Have you completed the task "${this.todo.title}"?`);
  if (completed) {
    this.todo.active = false; // Mark as completed
    // Optionally save the change to localStorage or emit an event
  } else {
    // Optionally blur the todo or handle accordingly
    this.todo.active = true;
  }
}
}
