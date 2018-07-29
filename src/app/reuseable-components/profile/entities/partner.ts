import {Entity, EntityBuilder} from './entity';
import {Note} from './note';

export class Partner extends Entity {
  public _name: string;
  public _address: string;
  public _city: string;
  public _zipcode: string;
  public _phone: string;
  public _url: string;
  public _contacts: Array<Object>;

  constructor(pCopy: PartnerBuilder) {
    super(pCopy);
    this._name = pCopy.partnerName;
    this._address = pCopy.partnerAddress;
    this._city = pCopy.partnerCity;
    this._zipcode = pCopy.partnerZipcode;
    this._phone = pCopy.partnerPhone;
    this._url = pCopy.partnerUrl;
    this._contacts = pCopy.partnerContacts;
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
    const name = object['Name'];
    builder.name(name);
    builder.profile(name);
    builder.address(object['Address']);
    builder.city(object['City']);
    builder.zipcode(object['Zipcode']);
    builder.phone(object['Phone']);
    builder.url(object['URL']);
    builder.contacts(object['Contacts']);
    builder.notes(object['Notes']);
    return builder.build();
  }

  public getTableProperties(): Array<string> {
    return ['Name', 'Address', 'City', 'Zipcode', 'Phone'];
  }

  public updateDisplay(partner: Partner) {
    this._display = partner._display;
    this._profile = partner._name;
  }
}

export class PartnerBuilder extends EntityBuilder {
  public partnerName: string;
  public partnerAddress: string;
  public partnerCity: string;
  public partnerZipcode: string;
  public partnerPhone: string;
  public partnerUrl: string;
  public partnerContacts: Array<Object>;

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

  public contacts(pContacts: Array<Object>) {
    this.partnerContacts = pContacts;
  }

  public build(): Partner {
    return new Partner(this);
  }
}
