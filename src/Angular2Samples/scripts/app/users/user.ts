export class Geo {
  lat: string;
  lng: string;
}

export class Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export class Address {
  city: string;
  geo = new Geo();
  street: string;
  suite: string;
  zipcode: string;
}

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address = new Address();
  company = new Company();
}