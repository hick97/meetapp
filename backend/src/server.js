import App from './app';

const PORT = 3001 || process.env.PORT;

App.listen(PORT, err => {
  if (err) {
    console.log('Error');
  } else {
    console.log('Server is running on port 3001...');
  }
});
