import { Pipe, PipeTransform } from '@angular/core';
import { CatalogItemsWithCategory } from '../models/catalog-items-with-catogery.model';

@Pipe({
    name: 'MyFilterPipe',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: Array<CatalogItemsWithCategory>, filter: string): Array<CatalogItemsWithCategory> {
        if (!items || !filter) {
            return items;
        }
        return items.filter(items => items.categoryName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}
