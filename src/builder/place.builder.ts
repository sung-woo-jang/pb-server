import { BuilderCommon } from './builder';
import { Place } from '../modules/place/entities/place.entity';
import { disassemble, getChoseong } from 'es-hangul';
import removeHtmlTags from '@common/utils/removeHtmlTags';

export class PlaceBuilder extends BuilderCommon<Place> {
  constructor() {
    super(Place);
  }

  setTitle(title: string): PlaceBuilder {
    this.object.title = removeHtmlTags(title);
    return this;
  }
  setDisassembled(disassembled: string): PlaceBuilder {
    this.object.disassembled = disassemble(removeHtmlTags(disassembled));
    return this;
  }

  setChoseong(choseong: string): PlaceBuilder {
    this.object.choseong = getChoseong(removeHtmlTags(choseong));
    return this;
  }
  setAddress(address: string): PlaceBuilder {
    this.object.address = address;
    return this;
  }
  setRoadAddress(road_address: string): PlaceBuilder {
    this.object.road_address = road_address;
    return this;
  }
  setDescription(description: string): PlaceBuilder {
    this.object.description = description;
    return this;
  }
  setTelephone(telephone: string): PlaceBuilder {
    this.object.telephone = telephone;
    return this;
  }
  setMapx(mapx: number): PlaceBuilder {
    this.object.mapx = mapx;
    return this;
  }
  setMapy(mapy: number): PlaceBuilder {
    this.object.mapy = mapy;
    return this;
  }
}
