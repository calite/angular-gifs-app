import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = '524zP8If3kCN2ZJLLpjNAhQtlPERsUCI';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //TODO: cambiar any por el tipo que corresponda
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //cargamos datos locales si existen.
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query); //insertamos al inicio del historial si no existe
      this._historial = this._historial.splice(0, 10); //recorta el array principal, coge 10 priemros

      localStorage.setItem('historial', JSON.stringify(this._historial)); //almacenamiento en local

    }
    /*
    //PETICION HTTP

    fetch('https://api.giphy.com/v1/gifs/search?api_key=524zP8If3kCN2ZJLLpjNAhQtlPERsUCI&q=dragon ball z&limit=10')
      .then(resp => {
        resp.json().then(data => console.log(data))
      })

    //OTRA FORMA
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=524zP8If3kCN2ZJLLpjNAhQtlPERsUCI&q=dragon ball z&limit=10');
    const data = await resp.json();
    
    console.log(data)
    */

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });


  }

}
