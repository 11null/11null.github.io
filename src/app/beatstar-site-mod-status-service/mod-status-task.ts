import { Subject, Observable } from 'rxjs';
import { ModStatusTaskProgress } from './mod-status-task-progress';
import { Status } from './status';

export class ModStatusTask {

    progress: Subject<ModStatusTaskProgress> = new Subject<ModStatusTaskProgress>();
    status: Status = Status.L;

    public asObservable(): Observable<ModStatusTaskProgress> {
        return this.progress.asObservable();
    }

    begin() {
        const sleep = async function (ms:number) {return new Promise((resolve)=>setTimeout(resolve,ms))};
        this.status = Status.L;
        fetch("//hsfd43.glitch.me/f3").then(e => e.text()).then(async e => {
            const prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            await sleep(2000);
            if (e == "ok") {
                prog.description = "Connection successful, server is UP.";
                prog.fakeCommandText = "Connected OK."
                this.status = Status.S;
                this.progress.next(prog)
            } else {
                prog.description = "Connection failed, server is DOWN."
                prog.fakeCommandText = "Connection failed."
                this.status = Status.E;
                this.progress.next(prog);
            }
            console.log(prog);
        }).catch(async e=>{
            const prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            await sleep(2000);
            prog.description = "Failed to check status. Please report problem below.";
            prog.fakeCommandText = "bash: wget: command not found";
            this.status = Status.W;
        });
        setTimeout(async()=>{
            if (this.status!=Status.L) return;
            await sleep(1000)
            if (this.status!=Status.L) return;
            let prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            prog.fakeCommandText = "[sudo] password for dev: ";
            this.progress.next(prog);
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = false;
            prog.fakeCommandText = "**********\n";
            this.progress.next(prog);
            await sleep(2300);
            if (this.status!=Status.L) return;
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            prog.fakeCommandText = "Host: ";
            this.progress.next(prog);
            if (this.status!=Status.L) return;
            await sleep(1000);
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = false;
            prog.fakeCommandText = "143.110.226.4\n";
            if (this.status!=Status.L) return;
            this.progress.next(prog);
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            prog.fakeCommandText = "Port: ";
            this.progress.next(prog);
            if (this.status!=Status.L) return;
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = false;
            prog.fakeCommandText = "5000\n";
            this.progress.next(prog);
            prog = new ModStatusTaskProgress();
            prog.fakeCommandOutput = true;
            prog.fakeCommandText = "Connecting...\n";
            if (this.status!=Status.L) return;
            this.progress.next(prog);
        },2500);
    }
}
