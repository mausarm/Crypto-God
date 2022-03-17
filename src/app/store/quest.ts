import { Asset } from "./asset";

export class Quest {

  type: string;
  duration: number;
  status: string;
  endTime: Date;
  startAssets: Asset[];
  score: number;
  target: number;

  constructor(
    type: string,
    duration: number,
    status: string,
    endTime: Date,
    startAssets: Asset[],
    score: number,
    target: number
  ) {
    this.type = type;
    this.duration = duration;
    this.status = status;
    this.endTime = endTime;
    this.startAssets = startAssets;
    this.score = score;
    this.target = target;
  }
}
