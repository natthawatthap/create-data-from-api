export interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    department: string;
  };
}
