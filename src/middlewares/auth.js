'use strict';

function auth(opts) {
  opts = opts || {};
  return function*(next){
    if(this.request.url==='/auth/'){
      yield* next;
    }else{
      console.log('apply auth, if is true, yield*, else , set status and body');
      if(true){
        yield* next;
      }else{
        this.status = 403;
        this.body = {
          errors: [{status: 403,title : 'Unauthenticated'}]
        };
      }

    }
  };
}


module.exports = auth;
