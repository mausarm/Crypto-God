
export enum RANGES { day, week, month, year, all }


export enum STATUS { owned, total, usd, offered}


export const RADIOCHECKED = {
    day: RANGES.day.toString(),
    week: RANGES.week.toString(),
    month: RANGES.month.toString(),
    year: RANGES.year.toString(),
    all: RANGES.all.toString(),
    offer: 'offer',
    quest: 'quest',
    none: 'none'
}

export const ASSET_ID = {
  total: 'total',
  usd: 'usd',
  bitcoin: 'bitcoin',
}

