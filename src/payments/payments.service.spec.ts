import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll',()=>{
  it('should return an array of 3 exact payments',()=>
  {
  const expectedResult=['payment1','payment2','payment3'];

  const result=service.findAll();

  expect(result).toEqual(expectedResult); 

  expect(result.length).toBe(3);
  expect(result).toContain('payment2');
  expect(result[0]).toBe('payment1');
  });
});

describe('findOne', ()=>{
it('should throw an error if payment is not found', ()=>{

expect(()=>{
service.findOne('999');
}).toThrow(NotFoundException);
});

it('should return the payment if the ID is correct', () => {
      const result = service.findOne('123');
      expect(result).toBe('payment123');
});
});
});
