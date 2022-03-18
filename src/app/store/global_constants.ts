
export enum RANGES { day, week, month, year, all }


export enum STATUS { owned, total, usd, offered }


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

export const QUEST_TYPE = {
  gainTotal: 'gainTotal',
  beatBitcoin: 'beatBitcoin',
  beatHodler: 'beatHodler',
  beatAverage: 'beatAverage'
}

export const QUEST_DURATION = {
  tenMin: '10min',
  hour: '1h',
  day: '24h',
}

export const QUEST_STATUS = {
  prestart: 'prestart',
  active: 'active',
  won: 'won',
  lost: 'lost'
}
