import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ChatMessageModel} from '../model/chat.model';
import {Observable} from 'rxjs';
import {ChatService} from '../chat.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @Input() id: string;
  @Input() roomId;
  @Input() title: string;
  @Input() closeable: boolean;
  @Output() close = new EventEmitter<void>();
  @Input() @HostBinding('class.floating') floating = true;

  @HostBinding('style.height') height = '100%';
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  isCollapsed: boolean;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = true;


  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {
    // Ha a roomId - t kívülról kapom, akkor nem érjük majd el itt a konstruktorban.
    // Inputok ngOnInit() - től elérhetőek

  }

  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
    this.chatMessage$
      .pipe(
        first()
      )
      .subscribe(
        (msg) => {
          this.shouldScrolling = true;
          this.cdr.detectChanges();
          this.ngAfterViewChecked();
        }
      );

  }

  collapseWindow() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.height = null;
      this.cdr.detectChanges();
    } else {
      this.height = '100%';
      this.shouldScrolling = true;
      this.cdr.detectChanges();
    }

  }

  closeWindow() {
    this.close.emit();
  }

  ngAfterViewChecked(): void {
    setTimeout(
      () => {
        if (this.shouldScrolling) {
          this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
          this.shouldScrolling = false;
        }
      }, 0);
    this.cdr.detectChanges();
  }

  onNewMessage(newMessage: string) {

    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.resetForm = true;
            this.cdr.detectChanges();
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

  ngAfterViewInit(): void {
    this.chatMessage$.subscribe(
      () => {
        this.shouldScrolling = true;
        this.cdr.detectChanges();
        this.ngAfterViewChecked();
      }
    );
    this.cdr.detach();

  }
}
