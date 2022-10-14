import {  PrefectureInterface } from "./IPrefecture";
export interface CantonInterface {
    ID: string;
    Name: string;
    Prefecture: PrefectureInterface;
    PrefectureID: number;
  }