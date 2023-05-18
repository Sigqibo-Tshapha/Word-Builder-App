import { SentencesService } from './../sentences.service';
import { Component } from '@angular/core';
import { Words } from '../type';
import { Sentence } from '../type';
import { WordsService } from '../words.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent {
  sentence: string = '';
  words: Words[] = [{ type: '', words: ''} ];
  wordsList: string[] = [];
  selectedType: string = '';
  selectedWord: string = '';
  savedSentences: Sentence[] = [];
  isLoading = true;

  constructor (
    private wordsService: WordsService,
    private sentencesService: SentencesService,
  ){ }

  ngOnInit(): void{
    this.wordsService.getWords().subscribe(words => this.words = words);
    this.wordsList = this.words[0].words.split(',');
    this.sentencesService.getSentences().subscribe(savedSentences => this.savedSentences = savedSentences);
    this.isLoading= false;
  }

  addWord(word: string): void{
    this.sentence += word;
  }

  changeType(type: string): void{
    console.log(this.words[0]);
    const newWords = this.words.find(word => word.type === type)?.words??'';
    this.wordsList = newWords?.split(',');
  }

  clearSentence(): void{
    this.sentence = ''
  }

  submit(): void{
    const acceptSentence = (this.sentence !== '' && this.sentence.length > 2);
    if (acceptSentence) {
      this.isLoading = true;
      this.savedSentences.push({sentence: `${this.sentence}`});
      this.sentencesService.postSentence({ sentence: this.sentence }).subscribe(sentence => this.sentence = sentence.sentence);
      
    this.isLoading = false;
    }
  }
}
