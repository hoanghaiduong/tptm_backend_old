// import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { join } from 'path';

// @Injectable()
// export class StaticMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {

//         const path = join(process.cwd(), 'public', req.url);
//         res.sendFile(path, {}, err => {
//             next(new BadRequestException(err.message))
//         });

//     }
// }
