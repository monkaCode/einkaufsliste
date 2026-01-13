export class Item {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: Date;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.bought = data.bought;
    this.createdAt = new Date(data.createdAt);
  }
}