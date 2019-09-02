module.exports = {
  dialect: 'postgres',
  // host: 'localhost', // run local db
  host: '192.168.99.100', // docker vitualization (Virtual Machine in Windows)
  username: 'postgres',
  // password: 'rico1997', run local
  password: 'docker', // docker vitualization (Virtual Machine in Windows)
  database: 'meetapp', // database
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
