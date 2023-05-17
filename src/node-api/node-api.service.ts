import { Injectable } from '@nestjs/common';
import { filter, sumBy } from 'lodash';
import { userData } from 'src/data/userData';
import fs from 'fs';
import path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { ConsolidateData, Userdata } from 'src/schemas/userdata.schema';
import { Model } from 'mongoose';

@Injectable()
export class NodeApiService {
  constructor(
    @InjectModel(Userdata.name) private userDataModel: Model<Userdata>,
  ) {}

  public async getUserData(): Promise<any> {
    return this.userDataModel.find().exec();
  }

  public async saveData(json: any): Promise<Userdata> {
    const userData = this.prepareUserDataToSave(json);
    const results = await this.userDataModel.find();
    const data = results[0];

    if (!data) {
      const createdUserData = new this.userDataModel(userData);
      return createdUserData.save();
    }
    const updated = await this.userDataModel.findByIdAndUpdate(
      { _id: data._id },
      userData,
      { new: true, lean: true },
    );
    return updated;
  }

  private prepareUserDataToSave(data: any): Userdata {
    const result = Object.keys(data).map((key): ConsolidateData => {
      if (key.replace(/\D/g, '') === '') {
        return null;
      }
      const acquirers = data[key].acquirers;
      const acquirerToList = this.convertAcquirersToAlist(acquirers);

      const totalPayValue = sumBy(acquirerToList, 'valorPagar');
      const totalReceiveValue = sumBy(acquirerToList, 'valorReceber');
      const totalValue = sumBy(acquirerToList, 'valorTotal');

      return {
        document: key,
        totalPayValue,
        totalReceiveValue,
        totalValue,
        acquirers: acquirerToList,
      };
    });

    const response: ConsolidateData[] = filter(result, (item: any) => item);
    return {
      consolidateData: response,
      agendaFutura: data.agendaFutura,
      atual: data.atual,
      proximo: data.proximo,
      ultimoPagamento: data.ultimoPagamento,
    };
  }

  private convertAcquirersToAlist(acquirers: any) {
    return Object.keys(acquirers).map((key) => {
      return {
        acquirer: key,
        ultimoPagamento: acquirers[key].ultimoPagamento,
        valorPagar: Number(acquirers[key].valorPagar),
        valorReceber: Number(acquirers[key].valorReceber),
        valorTotal: Number(acquirers[key].valorTotal),
      };
    });
  }
}
