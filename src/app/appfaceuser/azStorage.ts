
import {
    BlobServiceClient, 
  } from "@azure/storage-blob";
import { BlobItem } from '@azure/storage-blob';  
import { azConnectDetails } from "./azDetails"; 

  const blobServiceClient = new BlobServiceClient(azConnectDetails.azURL()); 

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
    const containerClient = blobServiceClient.getContainerClient(content.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(content.filename);
    const uploadBlobResponse = await blockBlobClient.upload(content.file, content.file.size);
    console.log(`Upload block blob ${content.filename} successfully`, uploadBlobResponse.requestId);
    
    return `Upload block blob ${content.filename} successfully ${uploadBlobResponse.requestId}`;
  }
