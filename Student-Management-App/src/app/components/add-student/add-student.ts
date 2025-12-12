import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudentComponent {
  // declare the form property; initialize in constructor to avoid "used before initialization" error
  form!: FormGroup;

  classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9'] as const;
  subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    // initialize form here (fb is available)
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      class: [null, Validators.required],
      gender: [null, Validators.required],
      hasHobby: [false],
      hobby: [''],
      favouriteSubject: [null]
    });

    // Clear hobby when hasHobby is unchecked
    this.form.get('hasHobby')!.valueChanges.subscribe(v => {
      if (!v) {
        this.form.get('hobby')!.setValue('');
      }
    });
  }

  // convenience getters
  get name() { return this.form.get('name'); }
  get classCtrl() { return this.form.get('class'); }
  get gender() { return this.form.get('gender'); }
  get hasHobby() { return this.form.get('hasHobby'); }
  get hobby() { return this.form.get('hobby'); }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // controls 'name', 'class', 'gender' are required; use non-null assertions and casts to satisfy Student type
    const payload: Student = {
      id: 0,
      name: this.name!.value as string,
      class: this.classCtrl!.value as Student['class'],
      gender: this.gender!.value as Student['gender'],
      hasHobby: !!this.hasHobby!.value,
      hobby: this.hasHobby!.value ? (this.hobby!.value as string) || null : null,
      favouriteSubject: (this.form.get('favouriteSubject')!.value as string) || null
    };

    this.studentService.addStudent(payload);
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
