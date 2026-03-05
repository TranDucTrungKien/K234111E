import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment-result',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './payment-result.component.html',
    styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
    resultCode: string | null = null;
    message: string | null = null;
    orderId: string | null = null;
    amount: string | null = null;
    isSuccess: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        // MoMo redirects back with query parameters
        this.route.queryParams.subscribe(params => {
            this.resultCode = params['resultCode'];
            this.message = params['message'];
            this.orderId = params['orderId'];
            this.amount = params['amount'];

            // resultCode '0' means success in MoMo API
            this.isSuccess = this.resultCode === '0';
        });
    }

    goBackToHome(): void {
        this.router.navigate(['/']);
    }
}
