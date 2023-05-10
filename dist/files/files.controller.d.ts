/// <reference types="multer" />
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): Promise<string | any>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<any>;
}
