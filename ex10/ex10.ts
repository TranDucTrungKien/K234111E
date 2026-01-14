import { Component } from '@angular/core';

class LunarYear {
  private readonly day: number;
  private readonly month: number;
  private readonly year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  private readonly TIME_ZONE = 7; // Vietnam UTC+7
  private readonly CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  private readonly CHI = [
    'Tý',
    'Sửu',
    'Dần',
    'Mão',
    'Thìn',
    'Tỵ',
    'Ngọ',
    'Mùi',
    'Thân',
    'Dậu',
    'Tuất',
    'Hợi',
  ];
  private readonly TUAN = [
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
    'Chủ nhật',
  ];

  private jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;

    let jd =
      dd +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
  }

  private getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;

    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));

    let deltat: number;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }

    const JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }

  private getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;

    const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

    let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);

    let L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));

    return Math.floor((L / Math.PI) * 6);
  }

  private getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    const sunLong = this.getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = this.getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  private getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1; // start with the month following lunar month 11
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  private convertSolar2Lunar(
    dd: number,
    mm: number,
    yy: number,
    timeZone: number
  ): {
    lunarDay: number;
    lunarMonth: number;
    lunarYear: number;
    lunarLeap: boolean;
  } {
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }

    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear: number;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = this.getLunarMonth11(yy + 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = false;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = true;
        }
      }
    }

    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    return { lunarDay, lunarMonth, lunarYear, lunarLeap };
  }

  findLunarYearDetail(): {
    tuan: string;
    ngayThangNamAm: string;
    nam: string;
    thang: string;
    ngay: string;
  } {
    const jdn = this.jdFromDate(this.day, this.month, this.year);
    const { lunarDay, lunarMonth, lunarYear, lunarLeap } = this.convertSolar2Lunar(
      this.day,
      this.month,
      this.year,
      this.TIME_ZONE
    );

    const yearName = `${this.CAN[(lunarYear + 6) % 10]} ${this.CHI[(lunarYear + 8) % 12]}`;
    const dayOfWeek = this.TUAN[jdn % 7];
    const dayName = `${this.CAN[(jdn + 9) % 10]} ${this.CHI[(jdn + 1) % 12]}`;
    const monthName = `${this.CAN[(12 * lunarYear + lunarMonth + 3) % 10]} ${
      this.CHI[(lunarMonth + 1) % 12]
    }${lunarLeap ? ' Nhuận' : ''}`;

    return {
      tuan: dayOfWeek,
      ngayThangNamAm: `${lunarDay}/${lunarMonth}/${lunarYear}`,
      nam: yearName,
      thang: monthName,
      ngay: dayName,
    };
  }
}

@Component({
  selector: 'app-ex10',
  standalone: false,
  templateUrl: './ex10.html',
  styleUrl: './ex10.css',
})
export class Ex10 {
  // Binding data for dropdowns
  days: string[] = [];
  months: string[] = [];
  years: string[] = [];

  // Selected values
  selectedDay: string = '6';
  selectedMonth: string = '9';
  selectedYear: string = '2005';

  // Result
  lunarResult: any = null;

  constructor() {
    // Initialize days (1-31)
    for (let i = 1; i <= 31; i++) {
      this.days.push(i.toString());
    }

    // Initialize months (1-12)
    for (let i = 1; i <= 12; i++) {
      this.months.push(i.toString());
    }

    // Initialize years (1900-2100)
    for (let i = 1900; i <= 2100; i++) {
      this.years.push(i.toString());
    }
  }

  chuyenDoi() {
    const lunar = new LunarYear(
      parseInt(this.selectedDay),
      parseInt(this.selectedMonth),
      parseInt(this.selectedYear)
    );
    this.lunarResult = lunar.findLunarYearDetail();
  }
}
