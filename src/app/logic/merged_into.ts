import { Asset } from 'src/app/logic/asset';
import { calculateTotalAssets } from './calculate_total';
import { STATUS } from './global_constants';
import { updateUSDhistory } from './update_usd_history';

export function mergedInto(mergeAssets: ReadonlyArray<Asset>, intoAssets: ReadonlyArray<Asset>): ReadonlyArray<Asset> {
    const returnAssets: Asset[] = intoAssets.map((ia) => {
        const ma = mergeAssets.find((a) => a.id === ia.id);
        if (ma) {
            return new Asset(ia.id, ma.name, ia.status, ma.logo_url, ma.price, ma.first_trade, ma.history, ia.amount_history, ia.amount_timestamps);
        }
        else {
            return ia.clone();
        }
    });

    return <ReadonlyArray<Asset>>returnAssets.map((a) => {
        switch (a.status) {
            case STATUS.total: {
                return calculateTotalAssets(returnAssets);
            }
            case STATUS.usd: {
                return updateUSDhistory(returnAssets);
            }
            default: {
                return a;
            }
        }
    });

}
