import faker from 'faker';
import Mappable from '../Interfaces/Mappable';

export class Company implements Mappable {
  name: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  constructor() {
    this.name = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  markerContent(): string {
    return `<h1>Company Name: ${this.name}</h1>
      <p>Catchphrase: ${this.catchPhrase}<p>`;
  }
}
