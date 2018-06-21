import {Entity, EntityBuilder} from './entity';
import {Note} from './note';

export class Partner extends Entity {
  public _name: string;
  public _address: string;
  public _city: string;
  public _zipcode: string; // TODO: should this be int of some sort?
  public _phone: string;
  public _url: string;

  constructor(pCopy: PartnerBuilder) {
    super(pCopy);
    this._name = pCopy.partnerName;
    this._address = pCopy.partnerAddress;
    this._city = pCopy.partnerCity;
    this._zipcode = pCopy.partnerZipcode;
    this._phone = pCopy.partnerPhone;
    this._url = pCopy.partnerUrl;
    this._display = {
      Name: this._name,
      Address: this._address,
      City: this._city,
      Zipcode: this._zipcode,
      Phone: this._phone,
      URL: this._url
    };
  }

  public static fromObject(object: Object): Partner {
    const builder: PartnerBuilder  = new PartnerBuilder();
    let property; // Create local variable to hold lookup so it isnt done multiple times?
    if (property = object['Name']) {
      builder.name(property);
      builder.profile(property);
    }
    if (property = object['Address']) {
      builder.address(property);
    }
    if (property = object['City']) {
      builder.city(property);
    }
    if (property = object['Zipcode']) {
      builder.zipcode(property);
    }
    if (property = object['Phone']) {
      builder.phone(property);
    }
    if (property = object['URL']) {
      builder.url(property);
    }
    if (property = object['Notes']) {
      builder.notes(property);
    }
    return builder.build();
  }

  public static getFormProperties(): Array<string> {
    return ['Name', 'Address', 'City', 'Zipcode', 'Phone', 'URL'];
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Address', 'City', 'Zipcode', 'Phone'];
  }
}

export class PartnerBuilder extends EntityBuilder {
  public partnerName: string;
  public partnerAddress: string;
  public partnerCity: string;
  public partnerZipcode: string; // TODO: should this be int of some sort?
  public partnerPhone: string;
  public partnerUrl: string;

  constructor() {
    super();
  }

  public name(pName: string) {
    this.partnerName = pName;
    this.profile(pName); // Make call to the profile of entity
  }

  public address(pAddress: string) {
    this.partnerAddress = pAddress;
  }

  public city(pCity: string) {
    this.partnerCity = pCity;
  }

  public zipcode(pZipcode: string) {
    this.partnerZipcode = pZipcode;
  }

  public phone(pPhone: string) {
    this.partnerPhone = pPhone;
  }

  public url(pUrl: string) {
    this.partnerUrl = pUrl;
  }

  public build(): Partner {
    return new Partner(this);
  }
}
