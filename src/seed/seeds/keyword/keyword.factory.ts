import { Keyword } from '../../../modules/keyword/entities';
import { KeywordBuilder } from '../../../builder/Keyword.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

export default localeKoSetSeederFactory(Keyword, (faker) =>
  new KeywordBuilder().setKeyword(String(faker.number.int({ min: 1, max: 10 }))).build()
);
