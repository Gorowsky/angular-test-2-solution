class CatApiService {

  static HOST = 'https://api.thecatapi.com';
  static API_KEY = 'e15ea063-9d04-4f3f-87dd-702f69278f92';
  static LIMIT = 21;

  constructor($http) {
    this.http = $http;
  }

  getCatById(id) {
    return this.http.get(`${CatApiService.HOST}/v1/images/${id}`, {
      headers : {'x-api-key': CatApiService.API_KEY}
    }).then(res => res.data);
  }
  
  getCats(page) {
    return this.http.get(`${CatApiService.HOST}/v1/images/search`, {
      headers : {'x-api-key': CatApiService.API_KEY},
      params: {
        "limit": CatApiService.LIMIT,
        "page": page
      }
    }).then(res => res.data);
  }
}

export default CatApiService;