import addDecimalPoint from '@common/utils/addDecimalPoint';
import removeHtmlTags from '@common/utils/removeHtmlTags';
import splitCategory from '@common/utils/splitCategory';
import { PlaceData } from '../dummy/placeData';

interface Place {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

function removeDuplicates(data: Place[]): Place[] {
  const seen = new Set();

  return data.filter((item) => {
    const key = `${item.title}|${item.roadAddress}`;
    if (seen.has(key)) {
      return false; // 이미 본 항목이므로 제거
    }
    seen.add(key);
    return true; // 새로운 항목이므로 유지
  });
}

const data = removeDuplicates(PlaceData).map(({ title, category, mapx, mapy, ...rest }) => {
  const [place_category_name, place_category_name_detail] = splitCategory(category);

  return {
    title: removeHtmlTags(title),
    place_category_name,
    place_category_name_detail,
    mapx: Number(addDecimalPoint(mapx)),
    mapy: Number(addDecimalPoint(mapy)),
    ...rest,
  };
});
export default data;
