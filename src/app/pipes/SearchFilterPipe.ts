import { Pipe, PipeTransform } from '@angular/core';
import { IProductData } from '../models/product-data.model';
@Pipe({
    name: 'SearchFilterPipe',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: Array<IProductData>, filter: string): Array<IProductData> {
        if (!items || !filter) {
            return items;
        }
        else if(filter == 'All')
        {
          return items;
        }
        return items.filter(items => items.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}