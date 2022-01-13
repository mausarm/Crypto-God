export class Asset {
  id: string; //z.B. "BTC"
  name: string; //z.B. "Bitcoin"
  status: number; // gibt an, ob das Asset im Besitz (owned) ist oder nur als Angebot (offered) oder einen Sonderstatus (total oder usd) siehe enums
  logo_url: string;
  price: number;
  first_trade: Date;
  //Array der verschiedenen RANGES (day, week, usw.)
  history: [
    {
      prices: number[];
      timestamps: Date[];
    },
    {
      prices: number[];
      timestamps: Date[];
    },
    {
      prices: number[];
      timestamps: Date[];
    },
    {
      prices: number[];
      timestamps: Date[];
    },
    {
      prices: number[];
      timestamps: Date[];
    }
  ];
  amount_history: number[];
  amount_timestamps: Date[];

  constructor(id, name, status, logo_url, price,
    first_trade, history, amount_history: any[], amount_timestamps: any[]) {
    this.id = id;
    this.name = name;
    this.status = Number(status);
    this.logo_url = logo_url;
    this.price = Number(price);
    this.first_trade = new Date(first_trade);
    
    this.history = [
      { prices: [], timestamps: [] },
      { prices: [], timestamps: [] },
      { prices: [], timestamps: [] },
      { prices: [], timestamps: [] },
      { prices: [], timestamps: [] }
    ];

    for (let i = 0; i < history.length; i++) {
      this.history[i].prices = history[i].prices.map(x => Number(x));
      this.history[i].timestamps = history[i].timestamps.map(x => new Date(x));
    }
    this.amount_history = amount_history.map(x => Number(x));
    this.amount_timestamps = amount_timestamps.map(x => new Date(x));
  }

  public clone(): Asset {
    return new Asset(this.id, this.name, this.status, this.logo_url, this.price, this.first_trade, this.history, this.amount_history, this.amount_timestamps);
  }

}
