import { DepartmentData } from "../models/DepartmentData";
import { User } from "../models/User";

export function transformUsersToDepartmentSummary(
  users: User[]
): DepartmentData {
  const departmentData: DepartmentData = {};

  // Iterate through each user
  users.forEach((user) => {
    // Extract relevant user information
    const department = user.company.department;
    const { gender, age, hair, address } = user;

    // Create the department entry if it doesn't exist
    if (!departmentData[department]) {
      departmentData[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        ageMode: 0,
        hair: {},
        addressUser: {},
        ages: [],
      };
    }

    // Increment the gender count
    if (gender === "male") {
      departmentData[department].male++;
    } else if (gender === "female") {
      departmentData[department].female++;
    }

    // Add age to the ages array
    departmentData[department].ages.push(age);

    // Count hair color occurrences
    const { color } = hair;
    if (!departmentData[department].hair[color]) {
      departmentData[department].hair[color] = 1;
    } else {
      departmentData[department].hair[color]++;
    }

    // Assign address data using a unique key (first name + last name)
    departmentData[department].addressUser[user.firstName + user.lastName] =
      address.postalCode;
  });

  // Calculate age range and mode for each department
  for (const departmentKey in departmentData) {
    if (departmentData.hasOwnProperty(departmentKey)) {
      const department = departmentData[departmentKey];
      const { ages } = department;

      // Calculate age range and mode using helper functions
      department.ageRange = calculateAgeRange(ages);
      department.ageMode = calculateAgeMode(ages);
    }
  }

  //console.log(departmentData);

  return departmentData;
}

// Helper function to calculate age range
export function calculateAgeRange(ages: number[]): string {
  if (ages.length === 0) {
    return "";
  }

  let minAge = ages[0];
  let maxAge = ages[0];

  for (let i = 1; i < ages.length; i++) {
    const age = ages[i];
    if (age < minAge) {
      minAge = age;
    }
    if (age > maxAge) {
      maxAge = age;
    }
  }

  if (minAge === maxAge) {
    return `${minAge}`;
  } else {
    return `${minAge} - ${maxAge}`;
  }
}

// Helper function to calculate age mode
export function calculateAgeMode(ages: number[]): number | null {
  if (ages.length === 0) {
    return null;
  }

  const ageFrequency: Record<number, number> = {};
  let maxCount = 0;
  let mode: number | null = null;

  for (const age of ages) {
    ageFrequency[age] = (ageFrequency[age] || 0) + 1; // Increment frequency

    if (ageFrequency[age] > maxCount) {
      maxCount = ageFrequency[age];
      mode = age;
    }
  }

  if (maxCount === 1) {
    return null; // No mode if all ages occur only once
  }

  return mode;
}