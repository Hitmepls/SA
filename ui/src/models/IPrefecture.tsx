import {  ProvinceInterface } from "./IProvince";
export interface PrefectureInterface {
    ID: string;
    Name: string;
    Province: ProvinceInterface;
    ProvinceID: number;
  }