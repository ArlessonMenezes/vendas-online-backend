import { IsNumber, IsString } from "class-validator";
import { Category } from "../model/category.entity";

export class ReturnCategoryDto {
  @IsNumber()
  idCategory: number;

  @IsString()
  name: string;

  constructor(category: Category) {
    this.idCategory = category.idCategory;
    this.name = category.name;
  }
}