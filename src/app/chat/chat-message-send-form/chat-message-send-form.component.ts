import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, skip} from 'rxjs/operators';

@Component({
  selector: 'app-chat-message-send-form',
  templateUrl: './chat-message-send-form.component.html',
  styleUrls: ['./chat-message-send-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageSendFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;
  @Output() newMessage = new EventEmitter<string>();
  @Input() reset = false;
  @Output() resetChange = new EventEmitter<boolean>();
  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    if (value === true) {
      this.form.get('chat-message').disable();
    } else {
      this.form.get('chat-message').enable();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  // Az onChanges nem fog elindulni második körben,
  // mert a második küldésnél már a reset form true értéken van.
  // Így, ha újra true - ra állítom, akkor az nem változás éa az onChange nem indul el.
  // Ezért kell a kétoldalú kötés
  // Ehhez kell egy output és egy input
  // @Input() reset = false;
  // @Output() resetChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reset'] != null
      && changes['reset'].isFirstChange() === false
      && changes['reset'].currentValue === true) {
      this.disabled = false;
      this.form.reset({'chat-message': null});
      this.chatMessageInput.nativeElement.focus();
    }
  }

  ngOnInit() {
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
      // emittálnunk kell a resetChange - t is, amit visszaállítunk false értékre
      // ezáltal viasszaáll a chat-window component ts - ben is false - ra a resetForm változó
      // az a resetForm változó van kétirányú adatkötésben a template -ben, amikor behívjuk a komponenst
      this.disabled = true;
      this.resetChange.emit(false);
      this.newMessage.emit(this.form.value['chat-message']);


    }

  }


}
