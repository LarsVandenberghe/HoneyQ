import { Injectable, signal, TemplateRef } from "@angular/core";

export interface Toast {
	title: string;
	description?: string;
	classname?: string;
	delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
	private readonly _toasts = signal<Toast[]>([]);
	readonly toasts = this._toasts.asReadonly();

	show(toast: Toast) {
		this._toasts.update((toasts) => [...toasts, toast]);
	}

	showStandard(message: string) {
		this.show({ title: message });
	}

	showSuccess(message: string) {
		this.show({ title: message , classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(message: string) {
		this.show({ title: message , classname: 'bg-danger text-light', delay: 15000 });
	}

	remove(toast: Toast) {
		this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
	}

	clear() {
		this._toasts.set([]);
	}
}