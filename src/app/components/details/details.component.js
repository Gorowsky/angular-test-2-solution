import './details.component.scss';

class DetailsComponentCtrl {
  constructor($routeParams, catApiService) {
    this.catApiService = catApiService;
    this.id = $routeParams.id;
    this.cat = null;
  }

  $onInit() {
    this.catApiService.getCatById(this.id)
      .then(cat => this.cat = cat);
  }
}

const DetailsComponent = {
  templateUrl: './components/details/details.component.html',
  controller: DetailsComponentCtrl,
  controllerAs: '$ctrl'
};

export default DetailsComponent;