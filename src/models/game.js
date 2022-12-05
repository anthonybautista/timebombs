import {getGameContract} from "@/utils/contract";

function Game(gameId,
              nftAddress,
              gameAddress,
              cost,
              fee,
              maxSupply,
              resetInterval,
              startTime,
              maxPerAddress,
              safePercent,
              maxWinners,
              paused,
              gameOver,
              chargeERC20,
              feeERC20,
              activeBombs) {
    this.gameId = gameId;
    this.gameAddress = gameAddress;
    this.nftAddress = nftAddress;
    this.cost = cost;
    this.fee = fee;
    this.maxSupply = maxSupply;
    this.resetInterval = resetInterval;
    this.startTime = startTime;
    this.maxPerAddress = maxPerAddress;
    this.safePercent = safePercent;
    this.maxWinners = maxWinners;
    this.paused = paused;
    this.gameOver = gameOver;
    this.chargeERC20 = chargeERC20;
    this.feeERC20 = feeERC20;
    this.activeBombs = activeBombs;
}

Game.setUpGame = async function (gameId, address) {
    let gameContract = getGameContract(address);
    let data = await gameContract.getGameInfo();
    let activeBombs = await gameContract.getActiveBombs();
    console.log(data)
    return new Game(gameId,
        data[1],
        address,
        Number(data[2]) / 10**18,
        Number(data[3]) / 10**18,
        Number(data[5]),
        Number(data[6]) * 1000,
        Number(data[7]) * 1000,
        data[9],
        data[10],
        data[11],
        data[13],
        data[14],
        data[15],
        data[16],
        activeBombs)
}

Game.getActive = async function (address) {
    let gameContract = getGameContract(address);
    return await gameContract.getActiveBombs();
}

export default Game;