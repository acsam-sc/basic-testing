import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const initialBalance = 250

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance)
    expect(bankAccount.getBalance()).toBe(initialBalance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToWithdraw = 300
    expect(() =>
    bankAccount
    .withdraw(amountToWithdraw))
    .toThrow(new InsufficientFundsError(initialBalance))
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToTransfer = 300
    const accountToTransferTo = getBankAccount(initialBalance)
    expect(() => 
      bankAccount
      .transfer(amountToTransfer, accountToTransferTo))
      .toThrow(new InsufficientFundsError(initialBalance))
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToTransfer = 100
    expect(() => 
      bankAccount
      .transfer(amountToTransfer, bankAccount))
      .toThrow(TransferFailedError)
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToDeposit = 150
    expect(bankAccount.deposit(amountToDeposit).getBalance()).toBe(initialBalance + amountToDeposit)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToWithdraw = 150
    expect(bankAccount.withdraw(amountToWithdraw).getBalance()).toBe(initialBalance - amountToWithdraw)
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(initialBalance)
    const amountToTransfer = 150
    const accountToTransferTo = getBankAccount(initialBalance)
    bankAccount.transfer(amountToTransfer, accountToTransferTo)
    
    expect(bankAccount.getBalance()).toBe(initialBalance - amountToTransfer)
    expect(accountToTransferTo.getBalance()).toBe(initialBalance + amountToTransfer)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(initialBalance)
    jest.spyOn(lodash, 'random').mockReturnValue(1)
    const result = await bankAccount.fetchBalance()
    expect(typeof result).toBe('number')
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(initialBalance)
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(98)
      await bankAccount.synchronizeBalance()
      expect(bankAccount.getBalance()).toBe(98)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance)
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null)
    expect(async () => await bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError)
  });
});
