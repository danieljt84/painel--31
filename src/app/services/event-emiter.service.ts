import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmiterService {

  private static emitters: {
    [nomeEvento: string]: EventEmitter<any>
  } = {}
  constructor() { }

  static get(nomeEvento: string): EventEmitter<any> {
    if (!this.emitters[nomeEvento])
      this.emitters[nomeEvento] = new EventEmitter();
    return this.emitters[nomeEvento];
  }
}
