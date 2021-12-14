import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleNameKey'
})
/**
 * Converts User Roles to name translation key
 */
export class RoleNameKeyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case "User": {
        return 'USERS.ROLETYPE.USER';
      }
      case "Employee": {
        return 'USERS.ROLETYPE.EMPLOYEE';
      }
      case "Admin": {
        return 'USERS.ROLETYPE.ADMIN';
      }
    }
    return '';
  }

}
