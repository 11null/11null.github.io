import { Component, OnInit } from '@angular/core';
import { Status } from '../../beatstar-site-mod-status-service/status';
import { ModStatusManagerService } from 'src/app/beatstar-site-mod-status-service/mod-status-manager.service';
import { ModStatusTask } from 'src/app/beatstar-site-mod-status-service/mod-status-task';
import { ModStatusTaskProgress } from 'src/app/beatstar-site-mod-status-service/mod-status-task-progress';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mod-status-site-main',
  templateUrl: './mod-status-site-main.component.html',
  styleUrls: ['./mod-status-site-main.component.scss']
})
export class ModStatusSiteMainComponent implements OnInit {
  status: Status = Status.L;
  progressText: string = 'dev@system: $';
  progressDescription: string = 'Testing main server...';
  cursor: string = '_';
  progressTextInd: number = this.progressText.length;
  task?: ModStatusTask;
  checkCount: number = 0;
  intervalTask = interval(100).subscribe(() => {
    if (this.progressTextInd < this.progressText.length) this.progressTextInd += (3 * Math.random());
  })
  intervalTask2 = interval(500).subscribe(() => {
    if (this.cursor == "_") this.cursor = " ";
    else this.cursor = "_"
  })
  constructor(private modStatusService: ModStatusManagerService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.startCheck()
  }

  get Status() {
    return Status
  }

  startCheck() {
    if (this.task != null && this.task.status == Status.L) return;
    if (this.checkCount > 5) {
      this.snackBar.open("Wait a minute before checking status again", undefined, {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      setTimeout(()=>{
        this.checkCount = 0;
      },60000);
      return;
    }
    this.checkCount++;
    this.progressText = 'dev@system: $'
    this.progressTextInd = this.progressText.length;
    this.task = this.modStatusService.makeTask();
    this.task.asObservable().subscribe(prog => {
      this.handleTaskProgress(prog);
    })
    const prog = new ModStatusTaskProgress();
    prog.description = "Connecting..."
    prog.fakeCommandText = "sudo ./test-mod-server\n"
    this.handleTaskProgress(prog);
  }

  private handleTaskProgress(taskProgress: ModStatusTaskProgress) {
    console.log(taskProgress);
    this.progressDescription = taskProgress.description || this.progressDescription;
    this.progressText += taskProgress.fakeCommandText;
    if (taskProgress.fakeCommandOutput) this.progressTextInd = this.progressText.length;
    this.status = this.task?.status || Status.S;
  }

  toolbarColor(): string {
    switch (this.status) {
      case Status.S:
        return ''
      case Status.W:
      case Status.E:
        return 'warn'
      case Status.L:
        return 'accent';
    }
    return '';
  }

}
