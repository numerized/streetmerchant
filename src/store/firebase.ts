const admin = require('firebase-admin');

var serviceAccount = {
  type: 'service_account',
  project_id: 'ps5reserva',
  private_key_id: 'c38335c53bfb017eeacbdf9c4ba71552e1806bfd',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrw4rOV0EyIL69\nLe+6VM9zVB+z+ID6no1CF8mrkz3IKhJH5QcTnkLKN53YTbIw4s9fjFrgfXBxC4cI\nwr/J79pNP9VnPOxajWHknfelW27swpe7LUJUXn/68rdFGygzUTh6MXHy7U6dUGv1\n1ziQM4lJZFl7+tzn+Yp8PjlyWooIUcPUMHyjYooZXK3tsFiiFJKeaO6LpiLlO42U\nw06W0Puu3fLDgewWvfavDNxl0UPj/luFgT+RqpcMh7tx5ceHh82JQHTwkN6OwjVA\nR3bBfvUhRlMoA5zIyszQMnpSs2aP95PkLqH6ix7DIzRUWonRn/3oyTZONQa3h/bk\nxLBb68tdAgMBAAECggEAI2Iexi6GuJr8/V/0S1r4onak5mn8k4Bxs1JmIDOyMUUN\nJtCa4gkdvYMg06p/fIJBvLWQGwKAelrQSpKN3aT7dp4GrV6Rm1p+L2U82kqRaIOg\n6YTWoFppazR7qGm1vBPrvb0HfL28T3RXK5eAI/Y0G7lti6Of/UmwjMp67Sxk7G/t\nTIkrQBaF3Pjp+eRkMU2LaiqOSE8uL4JQyx5lpiNSJsRRHv8+hcp1j7PL5BtC2cij\n087qhFgSOp8vWLU+zIxcjOdM8ESAj/dTZ+jebpJ/UNH/b4G0nmPJs1AXzRStqenh\nD1gMlaioDChUdKgTMOI/THi1I1vfOxAhNSMDoH6R0QKBgQD4dqD7jhC5BZDdsJeP\nSC1O614fbmeZSfsNqYpnxBIC+TL/9iwYsmLxPWvQKS2HKL2grFsshHDIFQ9X6TDJ\ngi9ZSWhJtCXsUFcmj4dnIGDkY0pIv/HISx2RFML2yC+WDuQ+Kdmy8Nqk6cd2oRzV\nETki24rxpGDeFEZNgS6Hl4BDjQKBgQDy6kxxhMZ3e/oeIYmCaihrK83Y8xtSi/5I\ny1cS1bbCQgCbnWO8p/S5WSdn5S7oSze8Bv8QUYoJTWOooiCBVBgUOh9LC91wbQyj\nssDzOneBXIKH9owJ9kIOZWngO8aWkjNUcls7+EBMb5egmg1YLD3o34aYhbPKjMxj\nQeoJ/VFLEQKBgBwfgVU33Viz8pPFO0Jyjv5R0dOI8Zz+LLZ9LDdWkBtaDZW/TXp2\nJpDbvOpQ3uBfkicvmxpM218qUxRGRsloPOfEUVOWWnyHE3Y/5LmdhpoTSwM1Bq7/\nIZecW/0G56v6f4cxwXxpmrXz6CnbTqInUupJI076piQ880AukQ+z7Ea5AoGBAK/F\ndjcWOn4vCZdP8S6bHlAeTD9V+klK319RM9p/JlV+aO4xfv/+EIklx+vX3I9eDiBS\nd7IZLmb4xso5Nogej6XjQM2O8lbtsZ2qNRBLGDpU9Gbpsf9rX/UG0QvedR5zAA11\nCitkwTIN9YvSrSFGMi4VwFERPj2skCCqi21bDb3hAoGAGXHeucMIszKB8EtI318N\np8VkhaltyOyUp7a9Ojj+NDES/bvo47fc38aA3xQE4aRtfi4otg/x4gDQbE/03zv9\nZGKLMe33p9Vprtr6NvplRb+ldaqC+5DcMSzJnbABy5c0j3ApdCktzBspSDZ+BM2+\niqJPYGvGT2DsEAFhiAbpoSk=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-xy0v4@ps5reserva.iam.gserviceaccount.com',
  client_id: '114345189183778539499',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xy0v4%40ps5reserva.iam.gserviceaccount.com',
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ps5reserva.firebaseio.com',
});

const updateItemStock = async (
  itemStockStatus: string,
  itemId: string,
  country?: string,
  url?: string,
  store?: string,
  brand?: string,
  series?: string,
  model?: string
) => {
  const name = `${brand} ${series} ${model}`;

  const payload = {
    country: country || null,
    amazon_group: country || null,
    bot_any: null,
    to_find: null,
    timeout: null,
    store: `${store}`,
    name: `${name}`,
    brand: `${brand}`,
    series: `${series}`,
    model: `${model}`,
    outage_number: 0,
    found: itemStockStatus,
    // found_captcha: found_captcha[0] ? found_captcha[0] : null,
    timestamp: admin.database.ServerValue.TIMESTAMP,
    status: 'done',
    url: url,
  };

  await admin.database().ref(`ps5sm/${itemId}`).update(payload);

  await admin
    .database()
    .ref(`notificationsFreeToSend`)
    .push({
      ...payload,
      found: 'MAYBE SOMETHING HERE! GO AND CHECK!!!',
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });
};

export const firebase = {admin, updateItemStock};
