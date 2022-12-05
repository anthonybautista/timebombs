import {getGameContract} from "@/utils/contract";
import {ethers} from "ethers";

function Bomb(tokenId, pic) {
    this.tokenId = tokenId;
    this.pic = pic;
}

Bomb.bombInfo = async function (address, tokenId) {
    let contract = getGameContract(address);
    return await contract.getBombInfo(tokenId);
}

Bomb.resetBomb = async function (address, bomb) {
    let contract = getGameContract(address);
    try {
        let tx = await contract.resetBomb(bomb);
        await tx.wait();
        console.log(`https://snowtrace.io/tx/${tx.hash}`);
        return "Updating Bomb... This takes about 30 seconds.";
    } catch (e) {
        console.log(e);
        return e["reason"];
    }
}

Bomb.activateBomb = async function (game, bomb) {
    let contract = getGameContract(game.gameAddress);
    try {
        let amount = 0;
        if (game.chargeERC20 && !game.feeERC20) {
            amount = game.fee;
        } else if (!game.chargeERC20 && !game.feeERC20) {
            amount = game.cost + game.fee;
        } else if (!game.chargeERC20 && game.feeERC20) {
            amount = game.cost;
        }
        let tx = await contract.activateBomb(bomb, { value: ethers.utils.parseEther(amount.toString()) });
        await tx.wait();
        console.log(`https://snowtrace.io/tx/${tx.hash}`);
        return "Updating Bomb...";
    } catch (e) {
        console.log(e);
        return e["reason"];
    }
}

Bomb.haltGame = async function (address, bomb) {
    let contract = getGameContract(address);
    try {
        let tx = await contract.haltGame(bomb);
        await tx.wait();
        console.log(`https://snowtrace.io/tx/${tx.hash}`);
        return `https://snowtrace.io/tx/${tx.hash}`;
    } catch (e) {
        console.log(e);
        return e["reason"];
    }
}

export default Bomb;