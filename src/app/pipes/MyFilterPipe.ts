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

        items = items.filter(items => items.catalogItems.forEach.name.toLowerCase().indexOf(searchfilter.toLowerCase()) !== -1);


        return items;
    }
}
