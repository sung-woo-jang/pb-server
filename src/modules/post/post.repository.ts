import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities';

@Injectable()
export class PostRepository extends Repository<Post> {}
