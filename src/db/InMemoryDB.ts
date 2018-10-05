import * as Enumerable from 'linq'
import * as faker from 'faker/locale/en'

import {
  IBid,
  IBidsQuery,
  IMerchant,
  IMerchantBid,
  IMerchantCreateRequest,
  IMerchantQuery,
  IMerchantsQuery
} from 'entity/api'
import { IDB, IRecordSet } from 'db/api'

export class InMemoryDB implements IDB {
  merchants: IRecordSet<IMerchant>
  merchantBids: IRecordSet<IMerchantBid>
  bids: IRecordSet<IBid>

  constructor() {
    this.fillDB()
  }

  getMerchants = (query: IMerchantsQuery) => {
    const rec0 = this.merchants

    const afterRec = query.after ? rec0.single(el => el.id == query.after) : null

    const sortField = query.sort || 'created'

    const rec1 = sortField ? rec0.orderBy(el => el[sortField].toString()) : rec0

    const rec2 = afterRec ? rec1.where(el => el[sortField].toString() > afterRec[sortField].toString()) : rec1

    const rec = rec2.take(10).toArray()

    return new Promise<Array<IMerchant>>(resolve => {
      setTimeout(() => resolve(rec), 1000)
    })
  }

  getMerchant = (query: IMerchantQuery) => {
    const rec0 = this.merchants

    const rec = query.merchantId ? rec0.singleOrDefault(el => el.id == query.merchantId, null) : null

    return new Promise<IMerchant>(resolve => {
      setTimeout(() => resolve(rec), 1000)
    })
  }

  merchantSave = (value: IMerchant) => {
    const index = this.merchants.indexOf(el => el.id === value.id)
    let newArray = this.merchants.toArray()
    newArray[index] = value
    this.merchants = Enumerable.from(newArray)

    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 3000)
    })
  }

  merchantDelete = (id: string) => {
    const index = this.merchants.indexOf(el => el.id === id)
    let newArray = this.merchants.toArray()
    newArray.splice(index, 1)
    this.merchants = Enumerable.from(newArray)
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), 1000)
    })
  }

  merchantCreate = (merchant: IMerchantCreateRequest) => {
    const { firstname, lastname, email, phone } = merchant
    const id = faker.random.uuid()
    this.merchants = this.merchants.insert(0, [
      {
        id,
        firstname,
        lastname,
        avatarUrl: faker.image.avatar(),
        email,
        phone,
        hasPremium: true,
        created: faker.date.between('2015-01-01', '2018-01-01').toISOString()
      }
    ])
    return new Promise<string>(resolve => {
      setTimeout(() => resolve(id), 1000)
    })
  }

  merchantBidsGet = (query: IBidsQuery) => {
    const bidsMap = this.bids.toDictionary(el => el.id)

    const rec0 = this.merchantBids.where(el => el.merchantId === query.merchantId).select(el => bidsMap.get(el.bidId))

    const afterRec = query.after ? rec0.single(el => el.id == query.after) : null

    const sortField = query.sort || 'created'

    const rec1 = sortField ? rec0.orderBy(el => el[sortField].toString()) : rec0

    const rec2 = afterRec ? rec1.where(el => el[sortField].toString() > afterRec[sortField].toString()) : rec1

    const rec = rec2.take(10).toArray()

    return new Promise<Array<IBid>>(resolve => {
      setTimeout(() => resolve(rec), 1000)
    })
  }

  fillDB = () => {
    let merchants = []
    let merchantBids = []
    let bids = []

    for (let i = 0; i < 100; i++) {
      const firstname = faker.name.firstName()
      const lastname = faker.name.lastName()

      const merchant = <IMerchant>{
        id: faker.random.uuid(),
        firstname,
        lastname,
        avatarUrl: faker.image.avatar(),
        email: faker.internet.email(firstname, lastname),
        phone: faker.phone.phoneNumber(),
        hasPremium: true,
        created: faker.date.between('2015-01-01', '2018-01-01').toISOString()
      }

      merchants.push(merchant)

      for (let j = 0; j < 100; j++) {
        const bid = <IBid>{
          id: faker.random.uuid(),
          carTitle: faker.commerce.productName(),
          amount: +faker.commerce.price(5000, 20000),
          created: faker.date.between(merchant.created, '2018-01-01').toISOString()
        }

        bids.push(bid)

        const merchantBid = <IMerchantBid>{
          id: faker.random.uuid(),
          merchantId: merchant.id,
          bidId: bid.id
        }

        merchantBids.push(merchantBid)
      }
    }

    this.merchants = Enumerable.from(merchants)
    this.merchantBids = Enumerable.from(merchantBids)
    this.bids = Enumerable.from(bids)
  }
}
