const CONFIG_KEYS  = {
    prod : {
     DB_URL: 'mongodb+srv://regrub:regrub@cluster0.xfmk9.mongodb.net/Cluster0?retryWrites=true&w=majority',
     WEBAPP_ENDPOINT: 'https://regrub-dev.web.app',
     STRIPE_KEY: 'sk_test_51HykKcJ3K6BjgJ1klOddpFJE4amCUZeGzCboLN5kTcwrYIeDcqPGDD1hwf1r0iZQWo7oJpmeoQFIaSR9qaBpOwkx009wh1mIUL'
    },
    dev : {
     DB_URL: 'mongodb+srv://regrub:regrub@cluster0.xfmk9.mongodb.net/Cluster0?retryWrites=true&w=majority',
     WEBAPP_ENDPOINT: 'http://localhost:8080',
     STRIPE_KEY: 'sk_test_51HykKcJ3K6BjgJ1klOddpFJE4amCUZeGzCboLN5kTcwrYIeDcqPGDD1hwf1r0iZQWo7oJpmeoQFIaSR9qaBpOwkx009wh1mIUL'
    }
  }
  
  const instance = 'dev';
  
  export function geyKeyValue(key){
    return CONFIG_KEYS[instance][key];
  }