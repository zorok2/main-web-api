import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ChatWidgetComponent } from '@shared/chat/chat-widget/chat-widget.component';
import {SmartadminWidgetsModule} from "@shared/widgets/smartadmin-widgets.module";
import {ChatService} from "@shared/chat/chat.service";
import { ChatComponent } from '@shared/chat/chat/chat.component';
import { ChatUsersComponent } from '@shared/chat/chat/chat-users.component';
import { ChatBodyComponent } from '@shared/chat/chat/chat-body.component';
import { ChatFormComponent } from '@shared/chat/chat/chat-form.component';
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "@shared/utils/utils.module";
import {UserModule} from "@shared/user/user.module";
import { AsideChatComponent } from '@shared/chat/aside-chat/aside-chat.component';
import { AsideChatUserComponent } from '@shared/chat/aside-chat-user/aside-chat-user.component';
import {PopoverModule} from "ngx-popover";
import {BsDropdownModule} from "ngx-bootstrap"

@NgModule({
  imports: [
      PopoverModule, BsDropdownModule,
    CommonModule, FormsModule, UtilsModule, UserModule, SmartadminWidgetsModule],
  declarations: [ChatWidgetComponent, ChatComponent, ChatUsersComponent, ChatBodyComponent, ChatFormComponent, AsideChatComponent, AsideChatUserComponent],
  exports: [ChatWidgetComponent, AsideChatComponent, AsideChatUserComponent ],
  providers: [ChatService]

})
export class ChatModule{}
