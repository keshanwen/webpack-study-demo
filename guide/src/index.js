//  import _ from 'lodash';

 function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

  
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default;

      print();
    });

    return element;
  }


 document.body.appendChild(component());

  fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
     console.log(json)
   })
   .catch(error => console.error('Something went wrong when fetching this data: ', error))

    if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
        console.log('loaded~~~~~~~~~~~~~~~~')
         navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('SW registered: ', registration);
         }).catch(registrationError => {
           console.log('SW registration failed: ', registrationError);
         });
       });
    }