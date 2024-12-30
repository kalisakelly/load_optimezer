import { IsNotEmpty } from "class-validator";

export class CreateNotificationDto {

  @IsNotEmpty()
  details :string
}
