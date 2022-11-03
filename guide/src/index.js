async function getComponent() {

    //  return import(/* webpackChunkName: "lodash" */ 'lodash').then( ( {default: _} )=> {
    //   console.log(_)
    //   var element = document.createElement('div');
  
    //    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    //    return element;
  
    //  }).catch(error => 'An error occurred while loading the component');

    let element = document.createElement('div');

    const { default: _ } = await import('loadsh')

    element.innerHTML =  _.join(['Hello', 'webpack'], ' ');

    return element

}

getComponent().then(component => {
  console.log(component)
 document.body.appendChild(component);
})