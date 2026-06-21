import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service:PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service=module.get<PaymentsService>(PaymentsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {

    // ==========================================================
    // APPROACH 1: NO MOCKING (Testing Controller + Service)
    // ==========================================================
    it('should return real data from the actual service', () => {
      // 1. Arrange: We have to guess the ACTUAL data the real service returns
      const expectedResult = ['payment1', 'payment2', 'payment3'];

      // 2. Act: Call the controller method directly
      const result = controller.getPayments();

      // 3. Assert: Verify it matches the real data
      expect(result).toEqual(expectedResult);
    });


    // ==========================================================
    // APPROACH 2: MOCKING (Testing Controller in Isolation)
    // ==========================================================
    it('should return fake data using a mocked service', () => {
      // 1. Arrange: Create totally different fake data for the test
      const expectedResult = ['mocked_payment_1', 'mocked_payment_2'];

      // 2. Mock: Intercept 'findAll' and force it to return our fake array!
      jest.spyOn(service, 'findAll').mockImplementation(() => expectedResult);

      // 3. Act: Call the controller (it unknowingly calls the mock)
      const result = controller.getPayments();

      // 4. Assert: Check if the controller successfully returned our fake array
      expect(result).toEqual(expectedResult);
    });

  });


});
