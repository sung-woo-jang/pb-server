import { Keyword } from '../../../modules/keyword/entities';
import { KeywordBuilder } from '../../../builder/keyword.builder';
import { localeKoSetSeederFactory } from '../utils/localeKoSetSedderFactory';

const KeywordFactory = localeKoSetSeederFactory(Keyword, (faker) =>
  new KeywordBuilder().setKeyword(String(faker.number.int({ min: 1, max: 10 }))).build()
);
export default KeywordFactory;
