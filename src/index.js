import angular from 'angular';

const appModule = angular.module('home', []);

import AppComponent from './app/components/app.component';
import HomeComponent from './app/components/home/home.component';
import DetailsComponent from './app/components/details/details.component';
import CatListComponent from './app/components/cat-list/cat-list.component';
import CatApiService from './app/services/cat-api.service';

appModule
  .config(['$locationProvider',
    $locationProvider => {
      $locationProvider.html5Mode(true);
    }
  ])
  .config(['$routeProvider', 
    $routeProvider => {
      $routeProvider
        .when('/', {
          template: '<home-component></home-component>',
        })
        .when('/details/:id', {
          template: '<details-component></details-component>'
        })
        .otherwise({
          redirectTo: '/'
        })
    }
  ])
  .component('appComponent', AppComponent)
  .component('homeComponent', HomeComponent)
  .component('detailsComponent', DetailsComponent)
  .component('catListComponent', CatListComponent)
  .service('catApiService', CatApiService);

export default appModule;