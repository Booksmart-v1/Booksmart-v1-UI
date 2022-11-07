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



export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
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
      if (isPlatform('hybrid')) {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        base64Data = file.data;
        console.log(file);
        console.log(base64Data);

      } else {
        base64Data = await base64FromPath(photo.webPath!);
      }
      console.log(base64Data);
      var bodyFormData = new FormData();
      bodyFormData.append("img-upload",base64Data);
      console.log(bodyFormData.get('img-upload'));


      axios
        .post(url,
          
          bodyFormData,{
    headers: {
     'accept': 'application/json',
     'Accept-Language': 'en-US,en;q=0.8',
     'Content-Type': `multipart/form-data;`,
    }
   }
      )
        .then(async (resp) => {
          console.log(resp);
          if (resp.status === 200) {
              console.log(resp);
              console.log(base64Data);
              // console.log(photo.webPath);

              // const file = require(photo.webPath?photo.webPath: '' );
              // console.log(file);
              
          }
        })
        .catch((err) => {
          console.log(err);
        });

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      if (isPlatform('hybrid')) {
        
        return {
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
      } else {
        
        return {
          filepath: fileName,
          webviewPath: photo.webPath,
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