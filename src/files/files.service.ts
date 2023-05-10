import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class FilesService {
    async fileExists(filePath: string): Promise<boolean> {
        return new Promise((resolve) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                resolve(!err);
            });
        });
    }
}
