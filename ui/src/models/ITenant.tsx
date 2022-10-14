import {  PrefixInterface } from "./IPrefix";
import {  CareerInterface } from "./ICareer";
import {  GenderInterface } from "./IGender";
import {  CantonInterface } from "./Icanton";
import { employerInterface } from "./Iemployer";

export interface UsersInterface {
  ID: string;
  Owner: employerInterface;
  OwnerID: number
  PrefixID: number;
  Prefix: PrefixInterface;
  Career: CareerInterface;
  CareerID: number;
  Gender: GenderInterface;
  GenderID: number;
  Canton: CantonInterface;
  CantonID: number;
  Name: string;
  Fname: string;
  Lname: string;
  Idcard: string;
  BirthDay: string;
  Age: number;
  Address: number;
  Village: string;
  Tel: string;
  Email: string;
}
