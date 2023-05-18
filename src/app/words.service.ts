import { Injectable } from '@angular/core';
import { Words } from './type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'appication/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(
    private http: HttpClient,
  ) { }

  getWords(): Observable<Words[]> {
    return this.http.get<Words[]>('/api/words');
  }
  
  //might want to have a component to add new words
  postWords(words: Words): Observable<Words> {
    return this.http.post<Words>(
      '/api/words',
      words,
      httpOptions,
      );
  }
}
