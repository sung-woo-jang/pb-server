import { SeederConstructor } from 'typeorm-extension/dist/seeder/type';
import type { SeederFactoryItem } from 'typeorm-extension/dist/seeder/factory';
import PostSeeder from './post/post.seeder';
import KeywordSeeder from './keyword/keyword.seeder';
import ImageSeeder from './image/image.seeder';
import CommentSeeder from './comment/comment.seeder';
import PlPickCategorySeeder from './pl_pick_category/pl_pick_category.seeder';
import PlaceSeeder from './place/place.seeder';
import PlaceCategorySeeder from './place_category/place_category.seeder';
import PlacePlPickCategoryPivotSeeder from './place_pl_pick_category_pivot/place_pl_pick_category_pivot.seeder';

import CommentFactory from './comment/comment.factory';
import PlPickCategoryFactory from './pl_pick_category/pl_pick_category.factory';
import PlaceFactory from './place/place.factory';
import PlacePlPickCategoryPivotFactory from './place_pl_pick_category_pivot/place_pl_pick_category_pivot.factory';
import PostFactory from './post/post.factory';
import KeywordFactory from './keyword/keyword.factory';
import ImageFactory from './image/image.factory';
import PlaceCategoryFactory from './place_category/place_category.factory';

export const seeds: SeederConstructor[] | string[] = [
  PostSeeder,
  ImageSeeder,
  KeywordSeeder,
  CommentSeeder,
  PlaceSeeder,
  PlaceCategorySeeder,
  PlPickCategorySeeder,
  PlacePlPickCategoryPivotSeeder,
];
export const factories: SeederFactoryItem[] | string[] = [
  PostFactory,
  ImageFactory,
  KeywordFactory,
  CommentFactory,
  PlaceFactory,
  PlaceCategoryFactory,
  PlPickCategoryFactory,
  PlacePlPickCategoryPivotFactory,
];
