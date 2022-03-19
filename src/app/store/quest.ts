import { Asset } from "./asset";

export class Quest {

  type: string;
  duration: string;
  status: string;
  endTime: Date;
  startAssets: Asset[];
  score: number;
  target: number;

  constructor(type, duration, status, endTime, startAssets: any[], score, target) {
    this.type = type;
    this.duration = duration;
    this.status = status;
    this.endTime = new Date(endTime);
    try {
      this.startAssets = startAssets.map(a =>
        new Asset(a.id, a.symbol, a.name, a.status, a.logo_url, a.price, a.first_trade, a.history, a.amount_history, a.amount_timestamps)
      );
    }
    catch (error) {
      this.startAssets = [];
    }
    this.score = Number(score);
    this.target = Number(target);
  }
}

