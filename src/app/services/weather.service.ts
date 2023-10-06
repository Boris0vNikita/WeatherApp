import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { WeatherData } from '../models/weather.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { ToastService } from 'angular-toastify';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  newCityName : string= ""

  constructor(private http: HttpClient,private errorService:ErrorService,private _toastService: ToastService) { }

  getWeatherData(cityName:string): Observable<WeatherData> {
    this.newCityName = cityName
      return this.http.get<WeatherData>(`${environment.weatherApiBaseUrl}/${cityName}`, {
        headers: new HttpHeaders()
          .set(
            environment.XRapidAPIHostHeaderName,
            environment.XRapidAPIHostHeaderValue
          )
          .set(
            environment.XRapidAPIKeyHeaderName,
            environment.XRapidAPIKeyHeaderValue
          ),
      }).pipe(
        catchError(this.errorHandler.bind(this))
            )
      
  }
  
  private errorHandler(error:HttpErrorResponse){
    if(error.status == 429){
      this._toastService.error("Токены в этом месяце закончились :( \nЗайдите попозже");
    }
    if(error.status == 500){
      this._toastService.error("Такого города не существует");
    }
    this.errorService.handle(error.message);
    return throwError(()=>error.message)
}
  
}
