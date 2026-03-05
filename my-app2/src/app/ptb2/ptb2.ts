import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  hsa: number = 0;
  hsb: number = 0;
  hsc: number = 0;
  result: string = '...';
  get_solution() {
    const a = this.hsa;
    const b = this.hsb;
    const c = this.hsc;
    if (a === 0) {
      if (b === 0) {
        if (c === 0) {
          this.result = 'Infinite solutions';
        } else {
          this.result = 'No solution';
        }
      } else {
        const x = -c / b;
        this.result = `Linear equation, one solution: x = ${x}`;
      }
    } 
    else {
      const D = b * b - 4 * a * c;
      if (D < 0) {
        this.result = 'No real solutions';
      } else if (D === 0) {
        const x = -b / (2 * a);
        this.result = `One real solution: x = ${x}`;
      } else {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        this.result = `Two real solutions: x1 = ${x1}, x2 = ${x2}`;
      }
    }
  }
}
