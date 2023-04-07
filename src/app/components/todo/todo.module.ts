import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap';

import { TodoService } from './shared/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  imports: [
    SharedModule, RouterModule, TooltipModule.forRoot(),
  ],
  declarations: [
    TodoListComponent
  ],
  providers: [
    TodoService,
  ]
})
export class TodoModule { }
