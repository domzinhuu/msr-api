import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserdataDocument = HydratedDocument<Userdata>;

export interface ConsolidateData {
  document: string;
  totalPayValue: number;
  totalReceiveValue: number;
  totalValue: number;
  acquirers: Acquirer[];
}

export interface Acquirer {
  acquirer: string;
  ultimoPagamento: string;
  valorPagar: number;
  valorReceber: number;
  valorTotal: number;
}

export interface DateValue {
  date: string;
  amount: number;
}

@Schema()
export class Userdata {
  @Prop()
  agendaFutura: number;
  @Prop()
  ultimoPagamento: string;
  @Prop({ type: Object })
  atual: DateValue;
  @Prop({ type: Object })
  proximo: DateValue;
  @Prop()
  consolidateData: ConsolidateData[];
  @Prop()
  json: string;
}

export const UserdataSchema = SchemaFactory.createForClass(Userdata);
