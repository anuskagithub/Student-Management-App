import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsStore: Student[] = [
    {
      id: 1,
      name: 'Aisha Khan',
      class: 'Class 8',
      gender: 'Female',
      hasHobby: true,
      hobby: 'Painting',
      favouriteSubject: 'Science'
    },
    {
      id: 2,
      name: 'Rohit Verma',
      class: 'Class 9',
      gender: 'Male',
      hasHobby: false,
      hobby: null,
      favouriteSubject: 'Mathematics'
    }
  ];

  private students$ = new BehaviorSubject<Student[]>(this.studentsStore.slice());

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  addStudent(student: Student) {
    const nextId = this.studentsStore.length ? Math.max(...this.studentsStore.map(s => s.id)) + 1 : 1;
    student.id = nextId;
    this.studentsStore.push(student);
    this.students$.next(this.studentsStore.slice());
  }
}
