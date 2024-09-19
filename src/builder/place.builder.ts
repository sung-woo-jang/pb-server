import { BuilderCommon } from './builder';
import { Place } from '../modules/place/entities/place.entity';

export class PlaceBuilder extends BuilderCommon<Place> {
  constructor() {
    super(Place);
  }

  setTitle(title: string): PlaceBuilder {
    this.object.title = title;
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
