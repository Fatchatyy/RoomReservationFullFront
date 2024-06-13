import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'filter'
})
export class FilterPipe implements PipeTransform {
 transform(value: any, filterName: string): any {
    if (!filterName) {
      return value;
    }
    return value.filter((etudiant: any) => etudiant.nomEt.toLowerCase().includes(filterName.toLowerCase()));
 }
}