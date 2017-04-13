import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpService } from '@freescan/http';
import { FREESCAN_ENV, AuthenticationService } from '@freescan/skeleton';

import { BillingRoutingModule } from './src/billing.routing';

import { ModalService } from './src/+services/modal.service';
import { GatewayService } from './src/+services/gateway.service';
import { PlanService } from './src/+services/plan.service';
import { SubscriptionService } from './src/+services/subscription.service';
import { StripeService } from './src/+services/stripe.service';

import { ModalComponent } from './src/modal/modal.component';
import { BillingButtonComponent } from './src/billing-button/billing-button.component';
import { SubscriptionsComponent } from './src/subscriptions/subscriptions.component';
import { PlansComponent } from './src/plans/plans.component';
import { PaymentComponent } from './src/payment/payment.component';

export * from './src';
export * from './src/+services/modal.service';
export * from './src/+services/gateway.service';
export * from './src/+services/plan.service';
export * from './src/+services/subscription.service';
export * from './src/+services/stripe.service';


const providers: Provider[] = [
    OAuthService,
    HttpService,
    ModalService,
    {
        provide:  AuthenticationService,
        useClass: AuthenticationService,
        deps:     [OAuthService, FREESCAN_ENV],
    },
    {
        provide:  GatewayService,
        useClass: GatewayService,
        deps:     [HttpService, FREESCAN_ENV],
    },
    {
        provide:  PlanService,
        useClass: PlanService,
        deps:     [HttpService, FREESCAN_ENV],
    },
    {
        provide:  SubscriptionService,
        useClass: SubscriptionService,
        deps:     [HttpService, AuthenticationService, FREESCAN_ENV],
    },
    {
        provide:  StripeService,
        useClass: StripeService,
        deps:     [GatewayService, SubscriptionService, PlanService, FREESCAN_ENV],
    },
];


@NgModule({
    imports: [
        CommonModule,
        BillingRoutingModule,
        ModalModule.forRoot(),
    ],

    exports: [
        ModalModule,
        ModalComponent,
        BillingButtonComponent,
        SubscriptionsComponent,
        PlansComponent,
        PaymentComponent,
    ],

    declarations: [
        ModalComponent,
        BillingButtonComponent,
        SubscriptionsComponent,
        PlansComponent,
        PaymentComponent,
    ],
})
export class BillingModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule:  BillingModule,
            providers: [
                ...providers,
            ],
        };
    }
}
