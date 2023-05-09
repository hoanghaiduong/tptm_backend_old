import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { Express } from 'express';
@Controller('files')
@ApiTags('FILE')
export class FilesController {
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

    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ status: 200, description: 'File uploaded successfully' })
    async uploadFile(@UploadedFile() file): Promise<string> {
        const image = file.buffer.toString('base64');
        const dataUrl = `data:${file.mimetype};base64,${image}`;
        return dataUrl;

    }
}


