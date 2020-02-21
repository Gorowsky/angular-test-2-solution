import './home.component.scss';
import $ from 'jquery';

class HomeComponentCtrl {
  constructor() {
    this.title = '';
    this.message = '';
    this.status = '';
    this.isLoading = true;
    $('.toast').toast();
  }

  receivedToast(toast) {
    this.title = toast.title;
    this.message = toast.message;
    this.status = toast.status;

    $('.toast').toast('show');
  }

  getIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
}

const HomeComponent = {
  templateUrl: './components/home/home.component.html',
  controller: HomeComponentCtrl,
  controllerAs: '$ctrl'
};

export default HomeComponent;