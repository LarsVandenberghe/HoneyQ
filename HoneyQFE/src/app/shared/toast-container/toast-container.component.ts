import { Component, inject } from "@angular/core";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../core/services/toast.service";

@Component({
	selector: 'app-toasts',
	imports: [NgbToast],
	template: `
		@for (toast of toastService.toasts(); track toast) {
			<ngb-toast
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
				{{toast.title}}
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container', style: 'position: fixed; top: auto!important; bottom: 0!important; left: 50%;!important; margin: 0.5em 0em; z-index: 1200; transform: translate(-50%, -50%);' },
})
export class ToastsContainer {
	readonly toastService = inject(ToastService);
}