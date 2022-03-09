import { AppState } from './app_state';
import { Asset } from './asset';
import { STATUS } from './global_constants';
import { parseJsonToAppstate } from '../logic/parse_json_to_appstate';

export const SIMPLE_MOCKASSETS: ReadonlyArray<Asset> = [
  new Asset(
    'TOTAL',
    'TOTAL',
    'Total Assets',
    STATUS.total,
    '../../../assets/dollaricon.png',
    1,
    new Date("2019-11-05T01:02:00.000Z"),
    [
      { prices: [41000+7777, 40500+7777, 80000+7777], timestamps: [new Date("2021-12-31T00:00:00.000Z"), new Date("2021-12-31T12:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [41000+7777, 42000+7777, 80000+7777], timestamps: [new Date("2021-12-24T00:00:00.000Z"), new Date("2021-12-28T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [38000+7777, 39000+7777, 80000+7777], timestamps: [new Date("2021-12-01T00:00:00.000Z"), new Date("2021-12-15T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [20000, 30000, 80000+7777], timestamps: [new Date("2021-01-01T00:00:00.000Z"), new Date("2021-06-01T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [4711, 10000], timestamps: [new Date("2019-11-05T01:02:00.000Z"), new Date("2020-01-01T00:00:00.000Z")] }
    ],
    [4711],
    [new Date()]
  ),
  new Asset(
    'USD',
    'USD',
    'US Dollar',
    STATUS.usd,
    '../../../assets/dollaricon.png',
    1,
    null,
    [
      { prices: [1, 1, 1], timestamps: [new Date("2021-12-31T00:00:00.000Z"), new Date("2021-12-31T12:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [1, 1, 1], timestamps: [new Date("2021-12-24T00:00:00.000Z"), new Date("2021-12-28T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [1, 1, 1], timestamps: [new Date("2021-12-01T00:00:00.000Z"), new Date("2021-12-15T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [1, 1, 1], timestamps: [new Date("2021-01-01T00:00:00.000Z"), new Date("2021-06-01T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [1, 1, 1], timestamps: [new Date("2010-01-01T00:00:00.000Z"), new Date("2015-01-01T00:00:00.000Z"), new Date("2020-01-01T00:00:00.000Z")] }
    ],
    [0, 7777],
    [new Date("2019-11-05T01:02:00.000Z"), new Date("2021-06-06T01:02:00.000Z")]
  ),
  new Asset(
    'bitcoin',
    'btc',
    'Bitcoin',
    STATUS.owned,
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    0,
    new Date("2010-01-01T00:00:00.000Z"),
    [
      { prices: [41000, 40500, 40000], timestamps: [new Date("2021-12-31T00:00:00.000Z"), new Date("2021-12-31T12:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [41000, 42000, 40000], timestamps: [new Date("2021-12-24T00:00:00.000Z"), new Date("2021-12-28T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [38000, 39000, 40000], timestamps: [new Date("2021-12-01T00:00:00.000Z"), new Date("2021-12-15T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [20000, 30000, 40000], timestamps: [new Date("2021-01-01T00:00:00.000Z"), new Date("2021-06-01T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")] },
      { prices: [10, 1000, 10000], timestamps: [new Date("2010-01-01T00:00:00.000Z"), new Date("2015-01-01T00:00:00.000Z"), new Date("2020-01-01T00:00:00.000Z")] }
    ],
    [1, 2],
    [new Date("2020-01-01T00:00:00.000Z"), new Date("2022-01-01T00:00:00.000Z")]
  ),
]

export const MOCK_APPSTATE: AppState = parseJsonToAppstate(
  ""
);
