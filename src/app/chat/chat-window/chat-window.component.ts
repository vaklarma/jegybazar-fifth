import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {MockedChatDatas} from '../mocked-chat.service';
import {environment} from '../../../environments/environment';
import {ChatMessageModel} from '../model/chat.model';
import {Observable} from 'rxjs';
import {ChatService} from '../chat.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;
  chatMessage$: Observable<ChatMessageModel[]>;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
  ) {
    // Ha a roomId - t kívülról kapom, akkor nem érjük majd el itt a konstruktorban.
    // Inputok ngOnInit() - től elérhetőek

  }

  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
    this.form = this.fb.group({
      'chat-message': [null, Validators.required]
    });

    this.form.get('chat-message')
      .valueChanges
      .pipe(distinctUntilChanged(
        msg => {
          return !(msg.length > 0 && this.invalidChatMessageInput);
        }
      ))
      .pipe(skip(1)) //egy lépést skippeljen, mert az első nem megy be a compare fg -be
      .subscribe(
        msg => this.invalidChatMessageInput = false
      );
  }

  sendMessage() {
    if (this.form.invalid) {
      this.invalidChatMessageInput = true;
      this.chatMessageInput.nativeElement.focus();
    } else {
      this.chatService.addMessage(this.roomId, this.form.value['chat-message'])
        .subscribe(
          resp => {
            if (resp) {
              this.form.reset({'chat-message': null});
              this.chatMessageInput.nativeElement.focus();
            } else {
              alert('Hiba a szerveren  chat küldése közben');
              // TODO it should solve error handling with tooltip
            }
          }
        );
    }

  }
}
