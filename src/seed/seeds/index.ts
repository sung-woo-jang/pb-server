import { SeederConstructor } from 'typeorm-extension/dist/seeder/type';
import type { SeederFactoryItem } from 'typeorm-extension/dist/seeder/factory';
import PostSeeder from './post/post.seeder';
import KeywordSeeder from './keyword/keyword.seeder';
import ImageSeeder from './image/image.seeder';
import CommentSeeder from './comment/comment.seeder';
import PlPickCategorySeeder from './pl_pick_category/pl_pick_category.seeder';
import PlaceSeeder from './place/place.seeder';
import keywordFactory from './keyword/keyword.factory';
import postFactory from './post/post.factory';
import imageFactory from './image/image.factory';
import commentFactory from './comment/comment.factory';
import plPickCategoryFactory from './pl_pick_category/pl_pick_category.factory';
import placeFactory from './place/place.factory';

export const seeds: SeederConstructor[] | string[] = [
  PostSeeder,
  KeywordSeeder,
  ImageSeeder,
  CommentSeeder,
  PlPickCategorySeeder,
  PlaceSeeder,
];
export const factories: SeederFactoryItem[] | string[] = [
  keywordFactory,
  postFactory,
  imageFactory,
  commentFactory,
  plPickCategoryFactory,
  placeFactory,
];
