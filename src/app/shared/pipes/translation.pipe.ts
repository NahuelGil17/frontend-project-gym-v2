import { Pipe, PipeTransform } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translation',
  standalone: true,
})
export class TranslationPipe implements PipeTransform {
  //constructor(private translateService: TranslateService) {}
  constructor() {}

  transform(value: string): string {
    switch (value) {
      case 'name':
        // return this.translateService.instant('Nombre');
        return 'Nombre';
      case 'lastName':
        // return this.translateService.instant('Apellido');
        return 'Apellido';
      case 'isActive':
        // return this.translateService.instant('Estado');
        return 'Estado';
      case 'description':
        // return this.translateService.instant('Descripción');
        return 'Descripción';
      case 'mode':
        // return this.translateService.instant('Modo');
        return 'Modo';
      case 'type':
        // return this.translateService.instant('Tipo');
        return 'Tipo';
      case 'createdAt':
        // return this.translateService.instant('Tipo');
        return 'Creado';
      case 'updatedAt':
        // return this.translateService.instant('Tipo');
        return 'Actualizado';
      case 'category':
        // return this.translateService.instant('Tipo');
        return 'Categoria';
      case 'isCustom':
        // return this.translateService.instant('Tipo');
        return 'Personalizada';
      case 'days':
        // return this.translateService.instant('Tipo');
        return 'Días';
      default:
        return value;
    }
  }
}
