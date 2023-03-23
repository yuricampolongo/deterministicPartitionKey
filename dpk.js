const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return "0";
  }

  if (!event.partitionKey || String(event.partitionKey).length > MAX_PARTITION_KEY_LENGTH) {
    const dataToEncrypt = String(event.partitionKey ?? event);
    return crypto.createHash("sha3-512").update(dataToEncrypt).digest("hex");
  }

  return String(event.partitionKey);
};
