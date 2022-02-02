import { Component, OnInit } from '@angular/core';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent implements OnInit {


  constructor(public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
  }
  createPost() {
    this.popupHandlerService.createPostEnabled = true;
  }

}