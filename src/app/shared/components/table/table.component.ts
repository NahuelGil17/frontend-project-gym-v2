import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EColorBadge } from '../../enums/badge-color.enum';
import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatNoDataRow } from '@angular/material/table';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { TranslationPipe } from '@shared/pipes/translation.pipe';
import { CamelToTitlePipe } from '@shared/pipes/camel-to-title.pipe';
import { MatCheckbox } from '@angular/material/checkbox';

/**
 * The TableComponent displays a table of data.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.componnent.html',
  standalone: true,
  imports: [
    NgClass,
    MatMenuTrigger,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    MatNoDataRow,
    BadgeComponent,
    LoaderComponent,
    NgFor,
    NgIf,
    CdkTableModule,
    TranslationPipe,
    CamelToTitlePipe,
    DatePipe,
    MatCheckbox,
  ],
})
export class TableComponent implements OnInit {
  EColorBadge: typeof EColorBadge = EColorBadge;
  @Output() readonly selectionChange = new EventEmitter<any[]>();
  @Output() readonly edit = new EventEmitter<any>();
  @Output() readonly delete = new EventEmitter<any>();
  @Output() readonly seeDetail = new EventEmitter<any>();
  @Output() readonly disabled = new EventEmitter<{
    id: string;
    disabled: boolean;
  }>();

  @Input() showDelete = true;
  @Input() showSeeDetail = false;
  @Input() showDisabled = false;
  /**
   * The list of column names to display in the table.
   * @type {Array} array of column names
   */
  @Input() displayedColumns: string[] = [];

  /**
   * The data to display in the table.
   * @type {Observable} observable of data
   */
  @Input() data!: any[] | null;

  /**
   * The total number of items in the data set.
   * @type {number} total count
   */
  @Input() total: number | null = 0;

  /**
   * Whether the data is currently being loaded.
   * @type {boolean} loading state
   */
  @Input() loading: boolean | null = false;

  /**
   * Whether the data has been filtered.
   * @type {boolean} filtered state
   */
  @Input() filteredData = false;

  /**
   * Header CSS class
   * @type {string} css class
   */
  @Input() headerCssClass = 'header-default';

  @Input() isSelect = false;
  @Input() selected: any[] = [];

  /**
   * The selected exercises.
   * @type {Set<string>} set of selected exercises
   */
  selection: any[] = [];

  get tableColumns(): string[] {
    const isSelect = this.isSelect;
    const tableColums = isSelect
      ? ['select', ...this.displayedColumns]
      : this.displayedColumns;
    return tableColums;
  }

  /**
   * Emit identifier to seeDetail seats of an organization
   * @param id Organization identifier
   */
  emitSeeDetail(id: string): void {
    this.seeDetail.emit(id);
  }
  /**
   * Emit identifier to edit seats of an organization
   * @param id Organization identifier
   */
  emitEdit(id: string): void {
    this.edit.emit(id);
  }

  /**
   * Emit identifier to deactivate organization
   * @param id Organization identifier
   */
  emitDelete(excercise: { id: string; gifUrl: string }): void {
    this.delete.emit(excercise);
  }

  emitDisabled(id: string, disabled: boolean): void {
    this.disabled.emit({ id, disabled });
  }

  resolveNestedProperty(object: any, path: string): any {
    return (
      path.split('.').reduce((o, key) => (o ? o[key] : null), object) || 'N/A'
    );
  }

  toggleSelection(element: any): void {
    const index = this.selection.findIndex((item) => item._id === element._id);
    if (index > -1) {
      this.selection.splice(index, 1);
    } else {
      this.selection.push(element);
    }
    this.selectionChange.emit(this.selection);
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selection = [];
    } else {
      this.selection = [...(this.data || [])];
    }
    this.selectionChange.emit([...this.selection]);
  }

  isAllSelected(): boolean {
    if (this.data) {
      return this.data?.every((item) =>
        this.selection.some((selected) => selected._id === item._id),
      );
    } else {
      return false;
    }
  }

  isSelected(element: any): boolean {
    return this.selection.some((item) => item._id === element._id);
  }

  ngOnInit() {
    this.selected
      ? (this.selection = [...this.selected])
      : (this.selection = []);
  }

  getColorBadge(category: string): EColorBadge {
    switch (category) {
      case 'room':
        return EColorBadge.SUCCESS;
      case 'cardio':
        return EColorBadge.ERROR;
      case 'mix':
        return EColorBadge.INFO;
      default:
        return EColorBadge.INFO;
    }
  }

  getTextBadge(category: string): string {
    switch (category) {
      case 'room':
        return 'Sala';
      case 'cardio':
        return 'Cardio';
      case 'mix':
        return 'Mixto';
      case 'Pecho':
        return 'Pecho';
      case 'Espalda':
        return 'Espalda';
      case 'Hombros':
        return 'Hombros';
      case 'Bíceps':
        return 'Bíceps';
      case 'Tríceps':
        return 'Tríceps';
      case 'Antebrazos':
        return 'Antebrazos';
      case 'Cuádriceps':
        return 'Cuádriceps';
      case 'Isquiotibiales':
        return 'Isquiotibiales';
      case 'Glúteos':
        return 'Glúteos';
      case 'Pantorrillas':
        return 'Pantorrillas';
      case 'Core':
        return 'Core';
      case 'Zona Lumbar':
        return 'Zona Lumbar';
      case 'Pilométricos':
        return 'Pilométricos';
      case 'Trapecios':
        return 'Trapecios';
      case 'Full Body':
        return 'Full Body';

      // Tipos de Movimiento
      case 'Empuje':
        return 'Empuje';
      case 'Tracción':
        return 'Tracción';
      case 'Dominante de Rodilla':
        return 'Dominante de Rodilla';
      case 'Dominante de Cadera':
        return 'Dominante de Cadera';
      case 'Estabilización':
        return 'Estabilización';
      default:
        return 'Desconocido';
    }
  }
}
