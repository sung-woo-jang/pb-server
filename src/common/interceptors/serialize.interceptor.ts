import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

const SuccessStatusCodeMessage = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
};

// 클래스를 의미하는 인터페이스
// any를 대체하고자 정의하였고, 어떤 내용이든 클래스면 만족함
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data: any) => {
        return {
          status: statusCode,
          message: SuccessStatusCodeMessage[statusCode],
          isLogin: request.session?.user != null,
          data: plainToInstance(this.dto, data, {
            // Convert instance to plain object and then back to class to trigger @Expose() decorators
            excludeExtraneousValues: true,
          }),
        };
      })
    );
  }
}
