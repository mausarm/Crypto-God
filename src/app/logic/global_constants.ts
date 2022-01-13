import { Asset } from './asset';

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

export const DEFAULTASSETS: Asset[] = [
    new Asset(
        'TOTAL',
        'Total Assets',
        STATUS.total,
        'https://cdn.pixabay.com/photo/2018/10/01/22/57/dollar-3717534_960_720.png',
        1,
        new Date(),
        [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
        [0],
        [new Date()]
    ),
    new Asset(
        'USD',
        'US Dollar',
        STATUS.usd,
        'https://cdn.pixabay.com/photo/2018/10/01/22/57/dollar-3717534_960_720.png',
        1,
        null,
        [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
        [0],
        [new Date()]
    ),
    new Asset(
        'BTC',
        'Bitcoin',
        STATUS.owned,
        'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
        0,
        null,
        [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
        [1],
        [new Date()]
    ),
    new Asset(
        'ETH',
        'Ethereum',
        STATUS.owned,
        '',
        0,
        null,
        [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
        [10],
        [new Date()]
    )
];
