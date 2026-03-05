import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id = 'K234111416';
  student_name = 'Nguyen Hoang Sang';
  student_email = 'sang@gmail.com';
  my_img = '/images/sang.jpg';
}
