import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Callback Hell
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.countriesService.searchContryByAlphaCode(id).subscribe((country) => {
    //     console.log({ country });
    //   });
    // });

    //Solución a callback hell
    //Params es un observable porque me estoy subscribiendo y puedo acceder al pipe y a diferentes metodos
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchContryByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');

        return (this.country = country);
      });
  }
}
