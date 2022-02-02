import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Observable } from 'rxjs';
import { Social, Comment } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  //showCommentList: boolean = false
  public CommentObservable: Observable<Comment[]>
  showAddComment: boolean = false

  Post: string
  PostId: string
  socials: Social
  public PostDataObservable: Observable<Social>

  constructor(private functions: AngularFireFunctions, public authService: AuthService) { }

  ngOnInit(): void {
  }

  openAddComment() {
    //this.showCommentsList = false
    this.showAddComment = true
  }
  close() {
    //this.showCommentsList = false;
    this.showAddComment = false;
  }

}