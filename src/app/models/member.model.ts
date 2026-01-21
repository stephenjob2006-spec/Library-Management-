export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipDate: Date;
  membershipType: MembershipType;
  activeLoans: number;
  maxLoans: number;
}

export enum MembershipType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  STUDENT = 'STUDENT'
}

export class Member implements IMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipDate: Date;
  membershipType: MembershipType;
  activeLoans: number;
  maxLoans: number;

  constructor(data: IMember) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.membershipDate = data.membershipDate;
    this.membershipType = data.membershipType;
    this.activeLoans = data.activeLoans;
    this.maxLoans = data.maxLoans;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  canBorrow(): boolean {
    return this.activeLoans < this.maxLoans;
  }

  getAvailableLoans(): number {
    return this.maxLoans - this.activeLoans;
  }
}
