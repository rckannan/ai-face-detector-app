
import {
    BlobServiceClient, 
  } from "@azure/storage-blob";
  import { BlobItem } from '@azure/storage-blob'; 


  const account = "rithstgaccai001"   
  const accountKey = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciyx&se=2024-01-31T01:36:25Z&st=2024-01-09T17:36:25Z&spr=https&sig=9kSdE199BLLfWgnJgm4QtQK9hoVnZdSosfUaKnk3kfE%3D" // environment.SAS;
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/${accountKey}`); 

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
