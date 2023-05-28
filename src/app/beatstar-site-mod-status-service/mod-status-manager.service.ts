import { Injectable } from '@angular/core';
import { ModStatusTask } from './mod-status-task';
import { ModStatusTaskProgress } from './mod-status-task-progress';

@Injectable({
  providedIn: 'root'
})
export class ModStatusManagerService {

  constructor() { }

  public makeTask() : ModStatusTask {
    const task = new ModStatusTask();
    const subs= task.asObservable().subscribe(this.handleTaskProgress);
    task.begin();
    return task;
  }

  private handleTaskProgress(taskProgress:ModStatusTaskProgress) {
    console.log(taskProgress);
  }
}
