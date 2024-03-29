import * as secureSession from '@fastify/secure-session';
import { UserService } from './user.service';
import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Render,
  Req,
  Res,
  Session,
  Sse,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  File,
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nest-lab/fastify-multer';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FastifyRequest } from 'fastify';
import { Observable, interval, map } from 'rxjs';
import { Response } from 'express';
import { readFileSync } from 'fs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('index')
  indexNew(@Res() response: Response){
    response.type('text/html').send(readFileSync(join(__dirname, '../../src', 'index.html')))
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({data: {hello: 'word'}})))
  }


  @Get('post')
  index(@Res() res){
    res.status(302).redirect('/login')
  }

  @Get()
  @Render('index.hbs')
  root() {
    return {message : 'Hello world!!!'}
  }



  @Get('users')
  async findAllTest(@Session() session: secureSession.Session) {
    const visits = session.get('visits');
    session.set('visits', visits ? visits + 1 : 1);
    console.log(visits);
    return this.userService.findAllNew();
  }

  @Get('test')
  async findAll(@Req() request: FastifyRequest) {
    return this.userService.findAll();
  }

  @Post('files')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 10000000, // 5MB
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png)$/)) {
          const error = HttpStatus.BAD_REQUEST;
          return callback(new HttpException('error', error), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFiles() files: any) {
    console.log(files);
    return { success: true };
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 1024000, // 5MB
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFile2(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: File,
  ) {
    console.log(file);
  }
}
