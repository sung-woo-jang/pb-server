import { SeederConstructor } from 'typeorm-extension/dist/seeder/type';
import type { SeederFactoryItem } from 'typeorm-extension/dist/seeder/factory';
import UserSeeder from './user/user.seeder';
import FollowSeeder from './follow/follow.seeder';
import PostSeeder from './post/post.seeder';
import KeywordSeeder from './keyword/keyword.seeder';
import ImageSeeder from './image/image.seeder';
import CommentSeeder from './comment/comment.seeder';
import PlPickCategorySeeder from './pl_pick_category/pl_pick_category.seeder';
import PlaceSeeder from './place/place.seeder';
import PlaceCategorySeeder from './place_category/place_category.seeder';
import PlacePickSeeder from './place_pick/place_pick.seeder';

import CommentFactory from './comment/comment.factory';
import PlPickCategoryFactory from './pl_pick_category/pl_pick_category.factory';
import PlaceFactory from './place/place.factory';
import FollowFactory from './follow/follow.factory';
import PlacePickFactory from './place_pick/place_pick.factory';
import PostFactory from './post/post.factory';
import KeywordFactory from './keyword/keyword.factory';
import ImageFactory from './image/image.factory';
import PlaceCategoryFactory from './place_category/place_category.factory';
import UserFactory from './user/user.factory';

export const seeds: SeederConstructor[] | string[] = [
  UserSeeder,
  FollowSeeder,
  PostSeeder,
  ImageSeeder,
  KeywordSeeder,
  CommentSeeder,
  PlaceCategorySeeder,
  PlaceSeeder,
  PlPickCategorySeeder,
  PlacePickSeeder,
];
export const factories: SeederFactoryItem[] | string[] = [
  UserFactory,
  FollowFactory,
  PostFactory,
  ImageFactory,
  KeywordFactory,
  CommentFactory,
  PlaceCategoryFactory,
  PlaceFactory,
  PlPickCategoryFactory,
  PlacePickFactory,
];
