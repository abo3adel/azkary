import { Zikr } from '@/entities/Zikr';
import {prop} from 'vue-class-component';

export const EmitsList = ['decree', 'edit', 'share', 'remove'];

export class Props {
    z = prop<Zikr>({ required: true });
    color = prop<string>({ required: true });
}