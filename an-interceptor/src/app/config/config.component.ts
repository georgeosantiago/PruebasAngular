import { Component, OnInit } from '@angular/core';
import { Config, Hero, ConfigService } from './config.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  error: any;
  headers: string[];
  config: Config;
  heroes: Hero[];


  constructor(
    private configService: ConfigService
  ) { }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
    this.heroes = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }

  showConfig_v2() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }

  showHeroes() {
    this.configService.getHeroes2()
        .subscribe(heroes => this.heroes = heroes);
  }  

  showHeroes2() {
    this.configService.getHeroes3()
      .subscribe(
        (data: Hero[]) => this.heroes = [ ...data ], // success path
        error => this.error = error // error path
      );
  }

  ngOnInit() {
  }
}
