import {request} from './request';

export function getDetail(iid){{
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}}

export class  goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.lowNowPrice;
  }
}
export class goodsparam{
  constructor(info,rule){
    this.image = info.images ? info.images[0] : '';
    this.info = info.set;
    this.sizes = rule.tables;
  }
}  

export class shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}