/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* Author: Twinkle Chatterjee
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-create-logo',
  templateUrl: './create-logo.component.html',
  styleUrls: ['./create-logo.component.css']
})
export class CreateLogoComponent implements OnInit {

  @ViewChild("closeBtn", { static: false }) public closeBtn: ElementRef;

  @Input('uid') uid: string;
  @Input('email') email: string;
  @Input('displayName') displayName: string;

  choosePhoto: boolean = true
  enableLoader: boolean = false
  showClose: boolean = false
  enableCropper: boolean = false

  selectedFile: FileList
  imageUrl: string = ""

  percentage: number = 0
  basePath: string;
  private currentFileUpload: FileUpload;
  public fileName: string

  @Output() editProfilePicCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(public uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.imageUrl = ""
    this.choosePhoto = true;
    this.enableCropper = false;

    this.basePath = '/Users/' + this.uid + '/ProfilePic';
  }

  detectImage(imageUpload) {
    this.selectedFile = imageUpload.target.files;
    const file = this.selectedFile.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;

      this.choosePhoto = false;
      this.enableCropper = true;
    }
    reader.readAsDataURL(file)

  }

  cancel() {
    this.imageUrl = ""
    this.choosePhoto = true;
    this.enableCropper = false;
  }

  cropPhotoCompleted(data: { completed: boolean }) {
    this.enableCropper = false;
    
    const file = this.selectedFile.item(0);
    
    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;

    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, "ProfilePic")
    .subscribe(percentage => {
      this.percentage = Math.round(percentage);
    },
    error => {
      console.log(error);
    }
    );

    this.editProfilePicDone();
  }

  editProfilePicDone() {
    this.showClose = true;
    this.editProfilePicCompleted.emit({ completed: true });
  }

  closeModal() {
    this.choosePhoto = true;
    this.showClose = false;
    this.closeBtn.nativeElement.click();
  }

}
