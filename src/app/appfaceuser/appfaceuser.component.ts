import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CONTENT, uploadFile } from './azStorage';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-appfaceuser',
  templateUrl: './appfaceuser.component.html',
  styleUrl: './appfaceuser.component.css'
})
export class AppfaceuserComponent {
  loader: boolean;
  imageDetails: any;
  formData: FormData;
  faceAppForm!: FormGroup;

  containerName : string = "face-detector-container";
  formErrorMessage: string = '';

  appPeople = { name: '', mobileNo: '', eMailAddress: '', blobURL : '', imageBlob : File };

  files: any;
  constructor(private httpClient: HttpClient) {  
    this.loader = false; 
  }
   
  ngOnInit(): void {
    this.faceAppForm = new FormGroup(
      {
        name: new FormControl(this.appPeople.name, [
          Validators.required,
          Validators.minLength(4)
        ]),
        mobileNo: new FormControl(this.appPeople.mobileNo,  
          [Validators.required,Validators.pattern(/^\d{10}$/)
        ]),
        eMailAddress: new FormControl(this.appPeople.eMailAddress, [
          Validators.required,Validators.email  
        ]),
        imageBlob: new FormControl(this.appPeople.imageBlob,[Validators.required])
      }
    );  

  }

  get name() {
    return this.faceAppForm.get('name')!;
  }

  get mobileNo() {
    return this.faceAppForm.get('mobileNo')!;
  }

  get eMailAddress() {
    return this.faceAppForm.get('eMailAddress')!;
  }

  get imageBlob() {
    return this.faceAppForm.get('imageBlob')!;
  }

  working = false;
  uploadFile: File | null;
  uploadFileLabel: string | undefined = 'Upload your selfie here...';
  uploadProgress: number;
  uploadUrl: string;

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  } 

  loadImage(){
    if (!this.uploadFile) {
      alert('Choose a file to upload first');
      return;
    }

    const formData = new FormData();
    formData.append(this.uploadFile.name, this.uploadFile);
  }

  upload() {
    if (!this.uploadFile) {
      alert('Choose a file to upload first');
      return;
    }

    const docJson = {
      eventId: 1,
      name : this.name.value,
      mobileNo : this.mobileNo.value,
      eMailAddress : this.eMailAddress.value,
      imageType : this.uploadFile.name.split('?')[0].split('.').pop(),
      fileName: this.uploadFile.name
    }
    const fileJson = new File([JSON.stringify(docJson)], this.mobileNo.value+".json", {type: "application/json'"})

    // const formData = new FormData();
    // formData.append(this.uploadFile.name, this.uploadFile);

    this.uploadUrl = '';
    this.uploadProgress = 0;
    this.working = true;

    // this.upload_file_Blob(fileJson);
    this.upload_file_Blob(this.uploadFile);
  } 

  upload_file_Blob(file: any) {   
    let content: CONTENT = {
      containerName: this.containerName,
      file: file,
      filename: file.name // `${this.containerName}-${Date.now()}.${file.name.split('.')[1]}`
    };
    uploadFile(content).then((res: string) => {
      console.log(res);
    })  
  }

  upload_Blob(file: any) {
    console.log(file.files.length);
    if (file.files.length > 0) {
      [...file.files].forEach((file: any) => {
        let content: CONTENT = {
          containerName: this.containerName,
          file: file,
          filename: file.name // `${this.containerName}-${Date.now()}.${file.name.split('.')[1]}`
        };
        uploadFile(content).then((res: string) => {
          console.log(res);
        })
        console.log(file);
      })
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.uploadFile = inputElement.files[0];
    }
  }

  onSubmit(): void {
    if (this.faceAppForm.valid) {
      this.upload()
      // Add logic to handle other form fields
    } else {
      // Handle form validation errors
      // this.formErrorMessage = this.faceAppForm.getError
    }
  }
}
