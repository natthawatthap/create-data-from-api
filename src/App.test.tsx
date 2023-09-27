import { DepartmentData } from "./models/DepartmentData";
import { User } from "./models/User";
import {
  calculateAgeMode,
  calculateAgeRange,
  transformUsersToDepartmentSummary,
} from "./utils/transformUsersToDepartmentSummary";

test("calculateAgeRange returns the correct age range", () => {
  const ages: number[] = [25, 30, 35, 40];

  const result: string = calculateAgeRange(ages);

  expect(result).toEqual("25 - 40");
});

test("calculateAgeMode returns the correct mode", () => {
  const ages: number[] = [25, 30, 35, 25, 40];

  const result: number | null = calculateAgeMode(ages);

  expect(result).toEqual(25);
});

test("transformUsersToDepartmentSummary correctly summarizes data for two users different departments", () => {
  const users: User[] = [
    {
      firstName: "Terry",
      lastName: "Medhurst",
      age: 50,
      gender: "male",
      hair: {
        color: "Black",
      },
      address: {
        postalCode: "20020",
      },
      company: {
        department: "Marketing",
      },
    },
    {
      firstName: "Sheldon",
      lastName: "Quigley",
      age: 28,
      gender: "male",
      hair: {
        color: "Blond",
      },
      address: {
        postalCode: "40219",
      },
      company: {
        department: "Services",
      },
    },
  ];

  const result = transformUsersToDepartmentSummary(users);

  console.log(result);
  expect(result).toEqual({
    Marketing: {
      male: 1,
      female: 0,
      ageRange: "50",
      ageMode: null,
      hair: {
        Black: 1,
      },
      addressUser: {
        TerryMedhurst: "20020",
      },
      ages: [50],
    },
    Services: {
      male: 1,
      female: 0,
      ageRange: "28",
      ageMode: null,
      hair: {
        Blond: 1,
      },
      addressUser: {
        SheldonQuigley: "40219",
      },
      ages: [28],
    },
  });
});

test("transformUsersToDepartmentSummary correctly summarizes data for two users same departments", () => {
  // Arrange (setup your test data)
  const users: User[] = [
    {
      firstName: "Terry",
      lastName: "Medhurst",
      age: 50,
      gender: "male",
      hair: {
        color: "Black",
      },
      address: {
        postalCode: "20020",
      },
      company: {
        department: "Marketing",
      },
    },
    {
      firstName: "Sheldon",
      lastName: "Quigley",
      age: 28,
      gender: "male",
      hair: {
        color: "Blond",
      },
      address: {
        postalCode: "40219",
      },
      company: {
        department: "Marketing",
      },
    },
  ];

  const result = transformUsersToDepartmentSummary(users);

  console.log(result);
  expect(result).toEqual({
    Marketing: {
      male: 2,
      female: 0,
      ageRange: "28 - 50",
      ageMode: null,
      hair: {
        Black: 1,
        Blond: 1,
      },
      addressUser: {
        TerryMedhurst: "20020",
        SheldonQuigley: "40219",
      },
      ages: [50, 28],
    },
  });
});
