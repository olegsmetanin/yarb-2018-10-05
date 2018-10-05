import {
  IBid,
  IBidsQuery,
  IMerchant,
  IMerchantBid,
  IMerchantCreateRequest,
  IMerchantQuery,
  IMerchantsQuery
} from 'entity/api'

import { IEnumerable } from 'linq'

export interface IRecordSet<T> extends IEnumerable<T> {}

export interface IDB {
  merchants: IRecordSet<IMerchant>
  merchantBids: IRecordSet<IMerchantBid>
  bids: IRecordSet<IBid>

  getMerchants(query: IMerchantsQuery): Promise<Array<IMerchant>>

  getMerchant(query: IMerchantQuery): Promise<IMerchant>

  merchantSave(value: IMerchant): Promise<void>

  merchantDelete(id: string): Promise<void>

  merchantCreate(query: IMerchantCreateRequest): Promise<string>

  merchantBidsGet(query: IBidsQuery): Promise<Array<IBid>>
}
