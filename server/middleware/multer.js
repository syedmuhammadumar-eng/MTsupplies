// we use multer for file management

import multer from 'multer';

const storage = multer.memoryStorage();

//single upload because we only need to upload one single file
export const singleUpload = multer({ storage }).single("file");