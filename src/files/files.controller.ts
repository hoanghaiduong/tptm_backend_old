import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FilesService } from './files.service';
import { promisify } from 'util';
@Controller('files')
@ApiTags('FILE')
export class FilesController {

    constructor(private readonly filesService: FilesService) { }
    @Post('upload')

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'src/files/upload',
            filename: (req, file, callback) => {
              
                const extension = path.extname(file.originalname);
                const filename = `${file.originalname}`;
                callback(null, filename);
            },
        }),
    }))
    @ApiResponse({ status: 200, description: 'File uploaded successfully' })
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string | any> {
        console.log(file);
        const filePath =  `src/files/upload/${file.filename}`;
        return { message: 'File uploaded successfully', file:filePath };
    }
    @Post('upload-multiple')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', 5, {
        storage: diskStorage({
            destination: 'src/files/uploads',
            filename: async (req, file, callback) => {

                let name = `${Date.now()}-unknown`;
                if (file.originalname && typeof file.originalname === 'string') {
                    name = `${Date.now()}-${path.parse(file.originalname).name}`;
                }
                const extension = path.parse(file.originalname || '').ext;
                const filePath = path.join('src/files/uploads', `${name}${extension}`);
                const fileExists = await promisify(fs.access)(filePath, fs.constants.F_OK)
                    .then(() => true) // file exists
                    .catch(() => false); // file does not exist
                if (!fileExists) {
                    callback(null, `${name}${extension}`);
                } else {
                    throw new Error('File already exists');
                }
            },
        })
    }))
    @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
    async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
        console.log(files);
        const filesPath = files.map(file => `src/files/uploads/${file.filename}`);
        return { message: 'Files uploaded successfully', files: filesPath };
    }

}


