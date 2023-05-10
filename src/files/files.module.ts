import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({

    imports: [
        // MulterModule.register({
        //     dest: 'src/files/upload',
        // })
    ],
    providers: [FilesService],
    controllers: [FilesController],
    exports: [FilesService]
})
export class FilesModule { }
