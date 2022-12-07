import erc721ABI from '../config/abi/erc721.json';
import erc20ABI from '../config/abi/erc20.json';
import gameABI from '../config/abi/timebomb.json';
import fireABI from '../config/abi/fire.json';
import {ethers} from "ethers";
import {simpleRpcProvider} from "@/utils/web3";
import store from '@/main';

export const getNFTContract = (address) => {
    const {library} = store.state.web3Modal;
    const signer = library.getSigner();
    return getContract(erc721ABI, address, signer);
}

export const getErc20Contract = (address) => {
    const {library} = store.state.web3Modal;
    const signer = library.getSigner();
    return getContract(erc20ABI, address, signer);
}

export const getErc20ContractNoSigner = (address) => {
    return getContract(erc20ABI, address);
}

export const getGameContract = (address) => {
    const {library} = store.state.web3Modal;
    const signer = library.getSigner();
    return getContract(gameABI, address, signer);
}

export const getGameContractNoSigner = (address) => {
    return getContract(gameABI, address);
}

export const getFireContract = () => {
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc");
    return new ethers.Contract("0x5adCD28C08Fdc5a913982391cebD866b27C717D4", fireABI, provider);
}

const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer ?? simpleRpcProvider;
    return new ethers.Contract(address, abi, signerOrProvider);
}
