import { Injectable } from '@nestjs/common';
import { filter, sumBy } from 'lodash';
import { userData } from 'src/data/userData';

@Injectable()
export class NodeApiService {
  public getUserData(): Promise<any> {
    try {
      const data = userData;
      const result = Object.keys(data).map((key) => {
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

      const response = filter(result, (item: any) => item);

      return Promise.resolve({ ...data, consolidateData: response });
    } catch (error) {
      return Promise.reject(
        new Error('Error ao processar os dados de usuario'),
      );
    }
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
