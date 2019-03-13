import {AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatMessageModel} from '../model/chat.model';
import {Observable} from 'rxjs';
import {ChatService} from '../chat.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() roomId;
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = true;


  constructor(
    private chatService: ChatService
  ) {
    // Ha a roomId - t kívülról kapom, akkor nem érjük majd el itt a konstruktorban.
    // Inputok ngOnInit() - től elérhetőek

  }

  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);

  }

  ngAfterViewChecked(): void {
    setTimeout(
      () => {
        if (this.shouldScrolling) {
          this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
          this.shouldScrolling = false;
        }
      }, 500);

  }

  onNewMessage(newMessage: string) {

    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.shouldScrolling = true;
            this.resetForm = true;
          } else {
            alert('Hiba a szerveren  chat küldése közben');
            // TODO it should solve error handling with tooltip
          }
        }
      );
  }

  trackByMessages(index: number, model: ChatMessageModel) {
    return model.$id;
  }
}
