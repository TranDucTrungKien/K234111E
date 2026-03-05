import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbiding',
  imports: [],
  templateUrl: './learnbiding.html',
  styleUrl: './learnbiding.css',
})
export class Learnbiding {
  student_id: string = 'K234111416';
  student_name: string = 'Nguyen Hoang Sang';
  student_address: string = 'Binh Duong';
  red_text_style={
    color: 'red',
  }
}
