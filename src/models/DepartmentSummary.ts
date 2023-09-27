export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  ageMode: number | null;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
  ages: number[];
}