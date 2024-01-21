// frontend/scripts/require.js

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min',
        'date-fns': 'https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.16.1/index.min',
        'personInteractions': 'personInteractions',
    }
  });
  
  requirejs(['personInteractions'], function(personInteractions) {
    personInteractions.main();
  });