import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';
import axios from "axios";
import { APIURL } from "../constants";
import { formPost, post } from '../common/api';



export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  imageUrl?: string;
}

const PHOTO_STORAGE_PATH = 'photos';

export function usePhotoGallery() {

    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const url = APIURL + "v2/uploadImageS3";
    useEffect(() => {
      const loadSaved = async () => {
        const { value } = await Storage.get({ key: PHOTO_STORAGE_PATH });
        const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];
        console.log(photosInStorage);

        if(!isPlatform('hybrid')){  
          for (let photo of photosInStorage) {
            const file = await Filesystem.readFile({
              path: photo.filepath,
              directory: Directory.Data,
            });
            
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
          }
          setPhotos(photosInStorage);
          };
        }
      loadSaved();
    }, []);


    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
      let base64Data: string;
      let b: Blob;
      let imgurl: string;
      if (isPlatform('hybrid')) {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        const r = await fetch(photo.path!)
        b = await r.blob();
        base64Data = file.data;
        console.log(file);
        console.log(base64Data);

      } else {
        base64Data = await base64FromPath(photo.webPath!);
        const r = await fetch(photo.webPath!)
        b = await r.blob();
      }
      console.log(base64Data);
      let image = new Image();
      image.src = base64Data;
      let name = new Date().getTime() + '.png';
      // const blob =
      // b.lastModifiedDate = new Date();
      var file = new File([b], name , {type: 'image/png'});
      var bodyFormData = new FormData();
      bodyFormData.append("img-upload",file, name);
      console.log(bodyFormData.get('img-upload'));

      console.log("Calling API")
     const response = await formPost(url, bodyFormData);
        // .then(async (resp) => {
      console.log("called api")
      console.log(response);
      if (response !== null && response.success === true) {
        console.log(response);
        console.log(file);
        imgurl = response.data.location;
          // console.log(photo.webPath);

          // const file = require(photo.webPath?photo.webPath: '' );
          // console.log(file);
          
      }
      else imgurl= '';
        // })
        // .catch((err) => {
        //   console.log(err);
        // });

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      if (isPlatform('hybrid')) {
        
        return {
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
          imageUrl: imgurl,
        };
      } else {
        
        return {
          filepath: fileName,
          webviewPath: photo.webPath,
          imageUrl: imgurl,
        };
      }
    };



    const takePhoto = async () => {

      
       const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
        });
        
        console.log(photo);

        const fileName = new Date().getTime() + '.jpeg';
        

   

        const savedFileImage = await savePicture(photo, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);
        Storage.set({ key: PHOTO_STORAGE_PATH, value: JSON.stringify(newPhotos) });
        return savedFileImage;

    };

    return {
        photos,
        takePhoto,
    };
}


export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}