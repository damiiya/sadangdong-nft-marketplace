import Web3 from "web3";
import { serverUrl_sol } from "./shared/api";

const web3 = new Web3(new Web3.providers.HttpProvider(`${serverUrl_sol}`));

export default web3;
