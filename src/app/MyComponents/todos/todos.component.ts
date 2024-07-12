// todos.component.ts
import { Component } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[];
  localItem: string | undefined;
  filteredTodos: Todo[] = [];
  searchQuery: string = '';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedItem = localStorage.getItem("todos");
      if (storedItem !== null) {
        this.localItem = storedItem;
      } else {
        console.error("No todos found in localStorage.");
      }
    } else {
      console.error("localStorage is not available.");
    }

    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }

    this.filteredTodos = [...this.todos];
  }

  deleteTodo(todo: Todo) {
    const idx = this.todos.indexOf(todo);
    this.todos.splice(idx, 1);
    this.saveTodos();
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodos();
  }

  toggleTodo(todo: Todo) {
    const idx = this.todos.indexOf(todo);
    this.todos[idx].active = !this.todos[idx].active;
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.searchTodos(); // Update the filtered list after any change
  }

  searchTodos() {
    if (this.searchQuery.trim() === '') {
      this.filteredTodos = [...this.todos];
    } else {
      this.filteredTodos = this.todos.filter(todo =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        todo.desc.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
