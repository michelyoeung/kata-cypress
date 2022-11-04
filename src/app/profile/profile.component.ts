import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileForm = this.formBuilder.group({
    name: '',
    age: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    localStorage.setItem('name', this.profileForm.value.name as string);
    localStorage.setItem('age', this.profileForm.value.age as string);
  }
}
