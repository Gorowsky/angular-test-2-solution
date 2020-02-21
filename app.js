import angular from 'angular';
import ngRoute from 'angular-route';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import './styles.scss';
import './src/index';

const requires = [
  ngRoute,
  'home'
];

window.app = angular.module('app', requires);

angular.bootstrap(document.getElementById('app'), ['app']);