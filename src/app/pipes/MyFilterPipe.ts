import { Pipe, PipeTransform } from '@angular/core';
import { CatalogItemsWithCategory } from '../models/catalog-items-with-catogery.model';

@Pipe({
    name: 'MyFilterPipe',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    filtereditems = Array<CatalogItemsWithCategory>();

    transform(items: Array<CatalogItemsWithCategory>, filter: string, searchfilter: string): Array<CatalogItemsWithCategory> {
        

        if (!items || !filter) {
            return items;
        }
        else if(filter == 'All')
        {
          return items;
        }

        items = items.filter(items => items.categoryName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

        this.filtereditems = items.filter(items => items.catalogItems.forEach.name.toLowerCase().indexOf(searchfilter.toLowerCase()) !== -1);

        return this.filtereditems;
    }
}
