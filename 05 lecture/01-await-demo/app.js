// await / async demo
function resolveAfterNSeconds(n) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000 * n);
    });
}

// normal promise calling code:
resolveAfterNSeconds(3)
    .then(function(response) {
        console.log("resolved!");
        console.log(response);
    })
    .catch(function(error) {
        console.log("error" + error);
    })

async function testAwait(){
    console.log("start testing await");
    var result = await resolveAfterNSeconds(5);
    console.log("await came back with: " + result); 
}


testAwait();


