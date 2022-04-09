import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import Cropper from 'cropperjs';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-update-logo',
  templateUrl: './update-logo.component.html',
  styleUrls: ['./update-logo.component.css']
})
export class UpdateLogoComponent implements OnInit {

  @ViewChild("img", { static: false }) public imageElement: ElementRef;

  @Input("imageUrl") imgInp: string;
  @Input("uid") uid: string;
  @Input("email") email: string;
  @Input("displayName") displayName: string;

  @Output() cropPhotoCompleted = new EventEmitter<{ completed: boolean }>();

  cropper: Cropper;
  componentName: string = "UPDATE-IMAGE"
  croppedImage: string;
  percentage: number;
  basePath: string;

  constructor(public backendService: BackendService, public uploadService: FileUploadService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.croppedImage = canvas.toDataURL("image/png");
      },
    });
  }

  setOrgDp() {
      const callable = this.functions.httpsCallable('organization/updateOrgLogo');
      const orgDomain = this.backendService.getOrganizationDomain();
      console.log(this.croppedImage);
      callable({ PhotoURL: this.croppedImage, OrgDomain: orgDomain}).subscribe({
        next: (data) => {
          console.log("Successful");
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
          console.error(error);
        },
        complete: () => console.info('Successful updated image')
      });

    this.cropPhotoDone();
  }

  cropPhotoDone() {
    this.cropPhotoCompleted.emit({ completed: true });
  }
}