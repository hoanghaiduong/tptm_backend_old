import { BadRequestException, Controller, Get, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { Express, Response, request } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FilesService } from './files.service';
import { promisify } from 'util';
import * as crypto from 'crypto';
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
                const uid = req.query.uid;

                let name = `${uid}-unknown`;
                if (file.originalname && typeof file.originalname === 'string') {
                    name = `${uid}-${path.parse(file.originalname).name}`;
                }
                const extension = path.parse(file.originalname || '').ext;
                const filePath = path.join(`src/files/upload`, `${name}${extension}`);
                if (fs.existsSync(filePath)) {
                    console.log("file already exists! deleting...")
                    fs.unlinkSync(filePath);
                    console.log("Deleted!");
                }

                console.log("Uploading...");
                callback(null, `${name}${extension}`);

            },
        }),
    }))
    
    @ApiResponse({ status: 200, description: 'File uploaded successfully' })
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string | any> {
        try {

            const filePath = `src/files/upload/${file.filename}`;
            return { message: 'File uploaded successfully', file: filePath };
        } catch (error) {
            throw new BadRequestException(error.message, error)
        }
    }


    //upload mutiple file 
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
            destination: `src/files/uploads`,
            filename: async (req, file, callback) => {
                const uid = req.query.uid;

                let name = `${uid}-unknown`;
                if (file.originalname && typeof file.originalname === 'string') {
                    name = `${uid}-${path.parse(file.originalname).name}`;
                }
                const extension = path.parse(file.originalname || '').ext;
                const filePath = path.join(`src/files/uploads`, `${name}${extension}`);
                if (fs.existsSync(filePath)) {
                    console.log("file already exists! deleting...")
                    fs.unlinkSync(filePath);
                    console.log("Deleted!");
                }

                console.log("Uploading...");
                callback(null, `${name}${extension}`);
            },
        })
    }))
    @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
    async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
        try {

            const filesPath = files.map(file => `src/files/uploads/${file.filename}`);
            return { message: 'Files uploaded successfully', files: filesPath };
        } catch (error) {
            throw new BadRequestException("Error uploading files" + error.message)
        }
    }

    @Get('file-name')
    getFile(@Query('filename') filename: string, @Res() res: Response) {
        const path = `public/product/uploads/images/${filename}`; // đường dẫn tới thư mục chứa tệp
        const fileContent = fs.readFileSync(path); // đọc nội dung của tệp
        res.header('Content-Type', 'image/jpeg'); // thiết lập header Content-Type cho tệp ảnh JPEG
        res.send(fileContent); // trả về nội dung của tệp
    }
    @Get()
    getAllFiles() {
      const directoryPath = 'public/product/uploads/images';
      const files = fs.readdirSync(directoryPath);
      const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
      const result = imageFiles.map(filename => ({
        filename,
        path: `${directoryPath}/${filename}`
      }));
      return result;
    }
}


