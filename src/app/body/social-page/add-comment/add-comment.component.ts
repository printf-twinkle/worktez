import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() addCommentCompleted = new EventEmitter<boolean>();

  content: string = ""

  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService) { }

  ngOnInit(): void {
  }

  addComment() {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true;

    if(this.content != "" ) {
      const callable = this.functions.httpsCallable("socialPage/addComment");
      callable({Uid: uid, Content: this.content, LastUpdatedDate: date, LastUpdatedTime: time }).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.enableLoader = false;
        this.addCommentCompleted.emit(true);
      });
    }
    console.log("done");
  }

  // close() {
  //   this.addCommentCompleted.emit(true);
  // }

}