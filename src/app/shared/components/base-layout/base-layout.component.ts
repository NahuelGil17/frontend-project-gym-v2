import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * The BaseLayoutComponent is a reusable component that provides a basic layout structure for other components.
 */
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  standalone: true,
  imports: [NgClass, RouterOutlet],
})
export class BaseLayoutComponent {
  /**
   * The background class for the base layout component.
   */
  @Input() bgClass!: string;
}
