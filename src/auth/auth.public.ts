import {
  CanActivate,
  ExecutionContext,
  Injectable
} from "@nestjs/common";

@Injectable()
export class Public implements CanActivate {
  constructor () {}

  canActivate(context: ExecutionContext): boolean {
    console.log("-------in public guard-------")
    return true;
  } 
}