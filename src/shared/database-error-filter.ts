import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost, status?: number) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const statusCode = status || 400; // Sử dụng giá trị động hoặc mặc định là 400 nếu không có giá trị được truyền vào.
        const message = `Lỗi cơ sở dữ liệu: ${exception.message}`;

        response.status(statusCode).json({
            statusCode: statusCode,
            message: message,
        });
    }
}

