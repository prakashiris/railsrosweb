



// function addCheckpoint(ev){
//     ev.preventDefault();  //to stop the form submitting
//         name = document.getElementById('username').value;
//         goalx = document.getElementById('goalx').value;
//         goaly = document.getElementById('goaly').value;
//     iddata.push(name);
//     checkpoints[name] = {
//         goalx: goalx,
//         goaly: goaly
//     };
//     document.forms[0].reset(); // to clear the form for the next entries
//     console.warn('added' , {checkpoints} );
//     console.log(iddata);
//     console.log(checkpoints[name]);

//     let pre = document.querySelector('#msg pre');
//     pre.textContent = '\n' + JSON.stringify(checkpoints, '\t', 2);
//     localStorage.setItem('goaldata', JSON.stringify(checkpoints) );
// }

// function goalpassfn(){
//     if(iddata.includes(document.getElementById('goalpass').value)){
//         name = document.getElementById('goalpass').value;
//             console.log(checkpoints[name].goalx);
//             alterdatax = checkpoints[name].goalx;
//             alterdatay = checkpoints[name].goaly;
//             document.getElementById('twod-map').innerHTML('asa');                       
//             }
//             $(document).ready(function(){
//                 // var currCord = getCoord();
               
//                 $(".mainContainer").imagePointer({
//                     // pointerArray    : currCord,
//                     pointerCallBack : function(pointerInfo){
//                         $('#outputElm').html(JSON.stringify(pointerInfo));
//                         // // currCord = getCoord();
//                         // currCord.push(pointerInfo);
//                         // document.cookie="coord=" + JSON.stringify(currCord);
//                     }
//                 });
             
//             });
//     }
// document.addEventListener('DOMContentLoaded', ()=>{
//         document.getElementById('goalpassbtn').addEventListener('click', goalpassfn);
//     });



