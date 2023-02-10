import { Injectable } from '@angular/core';

interface QuotesFromApi {
  quotes: QuoteFromApi[]
}

interface QuoteFromApi {
  character: string,
  characterDirection: string,
  image: string,
  quote: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { };

  


}

