import { Asset } from "./asset";
import { QUEST_DURATION, QUEST_STATUS } from "./global_constants";

export class Quest {

  type: number;
  duration: number;
  status: number;
  startTime: Date;
  endTime: Date;
  startAssets: Asset[];

  constructor(type: number, duration: number) {
    this.type = type;
    this.duration = duration;
    this.status = QUEST_STATUS.prestart;
  }

  public start(startAssets: Asset[]) {
    this.startAssets = startAssets;
    this.startTime = new Date();


    switch (this.duration) {
      case QUEST_DURATION.tenMin:
        this.endTime = new Date(this.startTime.getTime() + 10 * 60 * 1000);
        break;
      case QUEST_DURATION.hour:
        this.endTime = new Date(this.startTime.getTime() + 60 * 60 * 1000);
        break;
      case QUEST_DURATION.day:
        this.endTime = new Date(this.startTime.getTime() + 24 * 60 * 60 * 1000);
        break;
    }

  }

  //muss dann von der jeweiligen Unterklasse implementiert werden
  public getScore(): number {
    return 0;
  }

  public getTarget(): number {
    return 0;
  }

}
