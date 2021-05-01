process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = ""; //here write the mysql connection url
} else {
    urlDB = "here write the mysql connection"
};
process.env.URLDB = urlDB;
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';