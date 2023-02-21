import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'menu',
        data: { pageTitle: 'franquiciaApp.menu.home.title' },
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
      },
      {
        path: 'sale',
        data: { pageTitle: 'franquiciaApp.sale.home.title' },
        loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
      },
      {
        path: 'details',
        data: { pageTitle: 'franquiciaApp.details.home.title' },
        loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
      },
      {
        path: 'shopping-cart',
        data: { pageTitle: 'franquiciaApp.shoppingCart.home.title' },
        loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
