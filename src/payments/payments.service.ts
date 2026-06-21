import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PaymentsService {

findAll(){
return ['payment1','payment2','payment3']
}

findOne(id:string){
if(id!=='123')
{
throw new NotFoundException('Payment not found');
}
return 'payment123';
}
}


