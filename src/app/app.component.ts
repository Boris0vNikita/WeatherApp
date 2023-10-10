import { Component, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { ToastService } from 'angular-toastify';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OpenWeather';
  constructor(
    private weatherService:WeatherService,
    private _toastService: ToastService,
    private errorService : ErrorService){}

  cityName:string = 'minsk';
  weatherData?: WeatherData;
  max:number = 0
  min:number = 0


  ngOnInit(): void {
    this.getWeatherData(this.cityName)
  }

  onSubmit(){
    this.getWeatherData(this.cityName)
    this.cityName = ''
  }

   getWeatherData(cityName:string){
    try{
      const data = this.weatherService.getWeatherData(cityName)
      .subscribe((response) =>{
        
          this.weatherData = response
          this.max = this.getConverterTemp(Number(this.weatherData?.main.temp_max))
          this.min = this.getConverterTemp(Number(this.weatherData?.main.temp_min))
          
          console.log(response);
        },
      )

      if(data instanceof HttpErrorResponse) {
        console.log(data.message)
      }
    }catch(error){
      return console.log((error as Error).message);
    }
    
  }

  getConverterTemp(temp : number){
      return Math.round((temp * 9) / (5 + 32));
  }


}
