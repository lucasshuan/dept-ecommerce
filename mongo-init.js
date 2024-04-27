db = db.getSiblingDB('auth_dev_db');
db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD,
  roles: [{ role: 'readWrite', db: 'auth_dev_db' }],
});

db = db.getSiblingDB('payments_dev_db');
db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD,
  roles: [{ role: 'readWrite', db: 'payments_dev_db' }],
});
