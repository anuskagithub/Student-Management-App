import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent {
  students$: Observable<Student[]>;

  constructor(private studentService: StudentService) {
    this.students$ = this.studentService.getStudents();
  }
}
