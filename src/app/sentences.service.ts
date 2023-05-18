import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sentence } from './type';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class SentencesService {

  constructor(
    private http: HttpClient,
    ) { }

  getSentences(): Observable<Sentence[]> {
    return this.http.get<Sentence[]>('/api/sentences');
  }

  postSentence(sentence: Sentence): Observable<Sentence> {
    return this.http.post<Sentence>(
      '/api/sentence',
      JSON.stringify(sentence),
      httpOptions,
    )
  }
}
