import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input({ required: true }) breadcrumbItems!: IBreadcrumbItem[];
}

export interface IBreadcrumbItem {
  label: string;
  link: string | null;
}
