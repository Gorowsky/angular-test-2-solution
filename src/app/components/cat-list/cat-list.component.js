import './cat-list.component.scss';

class CatListComponentCtrl {
  constructor(catApiService) {
    this.catApiService = catApiService;
    this.cats = [];
    this.isLoading = false;
    this.page = 0;
  }

  $onInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    const triggerElement = document.getElementById("treshold-line");

    const observer = new IntersectionObserver((intersectionEntry, intersectionObject) => {
      if (intersectionEntry[0].isIntersecting && !this.isLoading) {
        this.isLoading = true;
        this.loadingEvent({$isLoading: this.isLoading});
        
        this.catApiService.getCats(this.page)
          .then(cats => ({cats, catsImg$: cats.map(cat => this.loadImage(cat.url))}))
          .then(({cats, catsImg$}) => Promise.all(catsImg$).then(catsImg => ({cats, catsImg})))
          .then(({cats, catsImg}) => {
            const catsWithLoadedImgs = this.zip(cats, catsImg)
              .map(([cat, catImg]) => ({...cat, img: catImg}));

            this.cats = [...this.cats, ...catsWithLoadedImgs];

            this.toastEvent({$message: this.createSuccessToast()});
            this.page++;
            this.isLoading = false;
            this.loadingEvent({$isLoading: this.isLoading});
          })
          .catch(err => {
            this.toastEvent({$message: this.createErrorToast()});
            this.isLoading = false;
            this.loadingEvent({$isLoading: this.isLoading});
            throw err;
          });
      }
    }, options);

    observer.observe(triggerElement);
  }

  createSuccessToast() {
    return {
      title: 'Cats loaded!',
      message: 'Cats has been successfully loaded.',
      status: 'SUCCESS'
    }
  }

  createErrorToast(err) {
    return {
      title: 'Cats fail to load!',
      message: 'Cats could not be loaded.',
      status: 'ERROR'
    }
  }

  zip(a1, a2) {
    return a1.map((x, i) => [x, a2[i]]);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', e => resolve(img));
      img.addEventListener('error', () => {
        reject(new Error(`Failed to load image from URL: ${url}`));
      });
      img.src = url;
    });
  }
}

const CatListComponent = {
  templateUrl: './components/cat-list/cat-list.component.html',
  controller: CatListComponentCtrl,
  controllerAs: '$ctrl',
  bindings: {
    loadingEvent: '&',
    toastEvent: '&'
  }
};

export default CatListComponent;