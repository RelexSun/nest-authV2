import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type ClassConstructor = new (...args: any[]) => object;

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: true,
        });
      }),
    );
  }
}
