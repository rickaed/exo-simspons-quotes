import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'simpsons-quotes';

  // pour construction affichage
  // testQuotes = [
  //   {
  //   character: "Milhouse Van Houten",
  //   characterDirection: "Right",
  //   image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002",
  //   quote: "But my mom says I'm cool.",
  // },
  // {
  //   character: "Duffman",
  //   characterDirection: "Left",
  //   image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FDuffman.png?1497567511709",
  //   quote: "Oh Yeah!"
  // },
  // {
  //   character: "Abe Simpson",
  //   characterDirection: "Right",
  //   image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FAbrahamSimpson.png?1497567511593",
  //   quote: "I used to be with it. But then they changed what it was. Now what I'm with isn't it, and what's it seems scary and wierd. It'll happen to you.",
  // },
  // {
  //   character: "Moe Szyslak",
  //   characterDirection: "Right",
  //   image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMoeSzyslak.png?1497567512411",
  //   quote: "Yeah. Call this an unfair generalization if you must.. but old people are no good at everything",
  // },
  // {
  //   character: "Dr. Nick",
  //   characterDirection: "Right",
  //   image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNickRiviera.png?1497567511084",
  //   quote: "Ah, be creative. Instead of making sandwhiches with bread, use Pop-Tarts. Instead of chewing gum, chew bacon.",
  // }
  // ]

  constructor(private http: HttpClient) { }
  mesQuotes: any = [];

  ngOnInit() {
    this.http.get<any>("https://thesimpsonsquoteapi.glitch.me/quotes?count=6")
      .subscribe((quotesFromApi: any) => {
        // console.log('from api', quotesFromApi)

        let quoteByCharacter: any = {};

        for (let i in quotesFromApi) {
          let characterName = quotesFromApi[i].character;
          quoteByCharacter[characterName] = quotesFromApi[i];
          // console.log(quoteByCharacter[characterName]);
        }

        for (let i in quoteByCharacter) {
          this.mesQuotes.push(quoteByCharacter[i]);
        }

        this.mesQuotes.forEach((persQuote: any) => {
          persQuote.quote = [persQuote.quote]
        });
        // console.log('mon tableau api', this.mesQuotes);
      })
  };
  newQuote(charact: string) {
    const toSend = charact.split(' ')
    // console.log(toSend)
    // console.log(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${toSend[0]}`)
    return this.http.get<any>(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${toSend[0]}`)
      .subscribe((quoteFromApi: any) => {
        console.log('ma nouvelle qutoe :', quoteFromApi[0].quote)

        for (let i in this.mesQuotes) {
          // console.log('personnage :',this.mesQuotes[i].character)

          if (this.mesQuotes[i].character === quoteFromApi[0].character) {
            this.mesQuotes[i].quote.push(quoteFromApi[0].quote)
          }
        }
      })
      }

};





