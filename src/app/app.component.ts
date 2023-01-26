import { AfterViewInit, Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { BehaviorSubject, delay, Subject, Subscription, take } from 'rxjs';
import { SECTIONS } from './data/section.data';
import { Section } from './models/section.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  sections: Section[] = SECTIONS;
  selectedSection: Section = SECTIONS[0];
  sectionsElem: HTMLElement[] = [];

  constructor(private router: Router) {

    // Gère les ancres via le router
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && router.url.includes('#')) {
        const id = decodeURI(router.url.split('#')[1]);
        if (this.sections.some((section: Section) => section.title === id)) {
          this.selectSection(id);
        }
      }
    })

    // Initialisation des subscribes
    this.initSubscribes();
  }

  ngAfterViewInit(): void {

    // Récupère tous les éléments HTML des sections
    this.sections.forEach((section: Section) => {
      const elem = document.getElementById(section.title);
      if (elem) this.sectionsElem.push(elem);      
    })
  }

  /**
   * Sélectionne une section via son titre
   * 
   * Scroll jusqu'à celle ci
   * @param sectionTitle 
   */
  selectSection(sectionTitle: string): void {
    document.getElementById(sectionTitle)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  /**
   * Ecoute les scroll utilisateurs pour highlight la section entièrement affichée à l'écran
   * @returns rien
   */
  @HostListener('window:scroll', ['$event']) 
  highlightScrolledSection() {
    let lastElem = this.sectionsElem[this.sectionsElem.length - 1];

    let bottomReached = window.innerHeight + window.scrollY >= document.body.scrollHeight;
    if (bottomReached) {
      this.selectedSection = this.sections.find((section: Section) => section.title === lastElem.id)!;
      return;
    }

    for (let i = 0; i < this.sectionsElem.length; i++) {
      let elem = this.sectionsElem[i];
      let r = elem.getBoundingClientRect();
      let percentageOfBlocVisible = r.bottom / r.height;
      if (percentageOfBlocVisible > .7) {
        this.selectedSection = this.sections.find((section: Section) => section.title === elem.id.replace('%20', ' '))!;
        break;
      }
    } 
  }

  /**
   * Méthodes try it
   */

  reset(section: Section): void {
    section.users = [];
    section.console = [];
    section.subscriptions?.forEach((subscription: Subscription) => subscription.unsubscribe());
    section.subscriptions = [];

    if (section.title !== 'BEHAVIOR SUBJECT' && section.title !== 'SUBSCRIBE') {
      this.initSubscribe(section);
    }
  }

  tryIt(section: Section): void {
    if (section.users && section.title !== "BEHAVIOR SUBJECT" && section.title !== "SUBSCRIBE") this.addUser(section);

    // Traitement spécifique
    switch (section.title) {
      case 'BEHAVIOR SUBJECT':
        this.initSubscribe(section);
        break;

      case 'SUBSCRIBE':
        this.initSubscribe(section);
        this.addUser(section);
        break;

      default: 
        console.log('Pas de code supplémentaire à exécuter pour cette section');
    }
  }

  private addUser(section: Section): void {
    section.users?.push({});
    this.log(section, 'Emission de ' + section.users?.length + ' utilisateurs...');
    section.userCount$?.next(section.users!.length);
  }

  /** 
   * Souscriptions
   */

  private initSubscribes(): void {
    this.sections.forEach((section: Section) => {
      if (section.title !== 'BEHAVIOR SUBJECT' && section.title !== 'SUBSCRIBE') {
        this.initSubscribe(section);   
      }   
    });
  }

  private initSubscribe(section: Section): void {
    switch (section.title) {
      case 'SUBJECT':
      case 'SUBSCRIBE':
      case 'BEHAVIOR SUBJECT':
        section.subscriptions?.push(section.userCount$?.subscribe((userCount: number) => this.log(section, userCount + ' utilisateurs.'))!);
        break;
      
      case 'PIPE':
        section.subscriptions?.push(section.userCount$?.pipe((delay(1000))).subscribe((userCount: number) => this.log(section, userCount + ' utilisateurs.'))!);
        break;

      case 'TAKE':
        section.subscriptions?.push(section.userCount$?.pipe((take(1))).subscribe((userCount: number) => this.log(section, userCount + ' utilisateurs.'))!);
        break;
    }
  }

  /**
   * Utils
   */

  private log(section: Section, msg: string): void {
    section.console?.push(msg);
  }
}
