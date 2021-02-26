module.exports = {
    // secret_key: 'quynguyen-secret-key',
    secret_key: require('crypto').randomBytes(64).toString('hex') || 'quynguyen-secret-key',
};
  