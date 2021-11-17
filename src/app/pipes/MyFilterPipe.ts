import { Pipe, PipeTransform } from '@angular/core';
import { CatalogItemsWithCategory } from '../models/catalog-items-with-catogery.model';
import { ICatalogFlat } from '../models/catalog-flat.model';

@Pipe({
    name: 'MyFilterPipe',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    transform(items: Array<CatalogItemsWithCategory>, searchfilter: string): Array<CatalogItemsWithCategory> {
        

        if (!items || !searchfilter) {
            return items;
        }

        else if(searchfilter == "")
        {
          return items;
        }

        items = items.filter(items => items.categoryName.toLowerCase().indexOf(searchfilter.toLowerCase()) !== -1);

        items = items.filter(items => items.catalogItems.forEach.name.toLowerCase().indexOf(searchfilter.toLowerCase()) !== -1);
        return items;
    }

    // transform(items: Array<CatalogItemsWithCategory>, filter: string): Array<CatalogItemsWithCategory> {
    //     if (!items || !filter) {
    //         return items;
    //     }
    //     else if(filter == 'All')
    //     {
    //       return items;
    //     }
    //     return items.filter(items => items.categoryName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    // }
}
