import { PartialType } from '@nestjs/mapped-types';
import { CreatePlacePickDto } from './create-place_pick.dto';

export class UpdatePlacePickDto extends PartialType(CreatePlacePickDto) {}
