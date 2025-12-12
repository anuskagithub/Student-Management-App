export interface Student {
  id: number;
  name: string;
  class: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9';
  gender: 'Male' | 'Female';
  hasHobby: boolean;
  hobby?: string | null;
  favouriteSubject?: string | null;
}
