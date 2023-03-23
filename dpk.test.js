const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('should use event partition key when a key is provided', () => {
    const event = { partitionKey: 'my-test-partition-key' };
    const result = deterministicPartitionKey(event);
    expect(result).toEqual('my-test-partition-key');
  });

  it('should create a new partition key if none was provided', () => {
    const event = { key: 'test-value' };

    const sha3Hash = crypto.createHash('sha3-512').update(String(event)).digest('hex');
    const result = deterministicPartitionKey(event);
    expect(result).toEqual(sha3Hash);
  });

  it('should convert non-string partitionKeys to string', () => {
    const event = { partitionKey: 1234 };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toEqual('string');
  });

  it('should truncate partition keys that exceed maximum length', () => {
    const testKey = 'abc'.repeat(100);
    const expected = crypto.createHash('sha3-512').update(testKey).digest('hex');
    const result = deterministicPartitionKey({ partitionKey: testKey });
    expect(result).toEqual(expected.substring(0, 256));
  });
});
