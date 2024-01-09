
import {
    BlobServiceClient, //StorageSharedKeyCredential,
  } from "@azure/storage-blob";
  import { BlobItem } from '@azure/storage-blob';
//   import { environment } from "src/environments/environment";
  const account = "rithstgaccai001" //environment.ACCOUNT_NAME;
  const accountKey = "sp=racwdl&st=2024-01-05T02:34:45Z&se=2024-01-30T10:34:45Z&sv=2022-11-02&sr=c&sig=2o6OJE9y528z3pmhMpeUcpHk98%2FF9I8FFpoobjeQPVg%3D" // environment.SAS;
  // BlobClientServiceString
  // const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/face-detector-container?${accountKey}`);
  
  // const blobServiceClient = new BlobServiceClient(
  //   // When using AnonymousCredential, following url should include a valid SAS or support public access
  //   `https://${account}.blob.core.windows.net`,
  //   sharedKeyCredential
  // );

  export interface BLOBItem extends BlobItem { };
  export interface CONTENT {
    containerName: string; // desired container name
    file: any;  // file to upload
    filename: string; // filename as desired with path
  }
  
  
  export async function getContainers() {
    let containers = [];
    let iter = blobServiceClient.listContainers();
    let containerItem = await iter.next();
    while (!containerItem.done) {
      containers.push(containerItem.value.name);
      containerItem = await iter.next();
    }
    return containers;
  }
  
  export async function createContainer(containername:any) {
    const containerName = containername || `${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    try {
      const createContainerResponse = await containerClient.create();
      return `Create container ${containerName} successfully ${createContainerResponse.requestId}`;
    }
    catch (err) {
      return {requestId: err.details.requestId, statusCode: err.statusCode, errorCode:err.details.errorCode}
    }
  }
  
  
  export async function listBlob(containerName: string) {
    // BlobContainerClient
    const containerClient = blobServiceClient.getContainerClient(containerName);
    let ListBlobs = [];
    let iter = containerClient.listBlobsFlat();
    let blobItem = await iter.next();
    while (!blobItem.done) {
      ListBlobs.push(blobItem.value);
      blobItem = await iter.next();
    }
    return ListBlobs;
  }
  
  export async function deleteBlob(containerName: string, filename:string){
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    const deleteBlob = await blockBlobClient.delete();
    return `Deleted Blob ${filename} successfully ${deleteBlob.requestId}`;
  }
  
  export async function deleteContainer(containerName:string){
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const deleteContainer = await containerClient.delete();
    return `Deleted Blob ${containerName} successfully ${deleteContainer.requestId}`;
  }
  
  export async function uploadFile(content: CONTENT) {
    // const containerClient = blobServiceClient.getContainerClient(content.containerName);
    // const blockBlobClient = containerClient.getBlockBlobClient(content.filename);
    // const uploadBlobResponse = await blockBlobClient.uploadBrowserData(content.file, {
    //   maxSingleShotSize: 4 * 1024 * 1024,
    //   blobHTTPHeaders: { blobContentType: content.file.type } // set mimetype
    // });

    const containerClient = blobServiceClient.getContainerClient(content.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(content.filename);
    const uploadBlobResponse = await blockBlobClient.upload(content.file, content.file.size);
    console.log(`Upload block blob ${content.filename} successfully`, uploadBlobResponse.requestId);
    
    return `Upload block blob ${content.filename} successfully ${uploadBlobResponse.requestId}`;
  }