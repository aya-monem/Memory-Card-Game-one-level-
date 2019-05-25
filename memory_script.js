
 function start_game(){
     // initial values (for start & restart )
     document.getElementById("popUpFinal").style.visibility = "hidden";
     document.getElementById("final_rate").innerHTML = "";
   no_moves = 0;
   stars = document.getElementsByClassName("fas fa-star");
   for (var i = 0 ; i < 3 ; i++){
       stars[i].style.visibility = "visible";
   }
   document.getElementById("moves").innerHTML = "";
   document.getElementById("counter_show").innerHTML = "";
   clearInterval(counter_play);  // special case(case of restarting game)
 
 

     // shuffle of cards
  var cards = document.getElementsByClassName("card"); 
  var cards=[...cards];
      // remove open class at first in case of restarting game(special case)
      cards.forEach(function(element){
        element.classList.remove("open","match","unmatch","disabled");
      });
  var shuffled_cards = array_shuffle(cards);
  
  // put shuffeled cards inside the game and show them at first
      putInsideHtml(cards);
   
   // showing all cards at first second
   setTimeout(function(){
     cards.forEach(function(ele){
        ele.classList.remove("open");
       ele.addEventListener("click", showCard );
       ele.addEventListener("click", opened_cards );
     });
   },1000);
   
   //  start counter   
      call_counter();
      
      
 }
     
   // declaration of showcard function
   function showCard(){
     this.classList.add("open");
    
   };
     
     // declaration of opened_cards function
     //var no_moves = 0;
     var openedCards = [];
   function opened_cards(){
        openedCards.push(this);
        this.removeEventListener("click", showCard);
        this.removeEventListener("click", opened_cards);
          if(openedCards.length === 2){
            moves_counter(); 
              if (openedCards[0].childNodes[1].className === openedCards[1].childNodes[1].className){ // matching case
                      openedCards.forEach(function(ele){
                          ele.classList.remove("open");
                          ele.classList.add("match");
                          
                      });
                       setTimeout(function(){
                        openedCards[0].classList.remove("match");
                        openedCards[0].classList.add("disabled");
                        openedCards[1].classList.remove("match");
                        openedCards[1].classList.add("disabled");
                        openedCards = [];

                              /// case of finishing game (all cards matched) 
                             var matched_cards = document.getElementsByClassName("disabled");
                             if(matched_cards.length == 16){
                                 clearInterval(counter_play);
                                 document.getElementById("popUpFinal").style.visibility = "visible"; 
                                document.getElementById("final_moves").innerHTML = document.getElementById("moves").innerHTML;
                                document.getElementById("final_time").innerHTML= document.getElementById("counter_show").innerHTML;
                                document.getElementById("final_rate").innerHTML= document.getElementById("rating").innerHTML;
                             }

                       },500);      
                             
              }
              
              else  {   // unmatching case 
                    // adding unmatch class
                  openedCards.forEach(function(ele){
                    ele.classList.remove("open");
                      ele.classList.add("unmatch");
                    });
                      // after 1 sec , remove unmatch class
                      setTimeout(function(){

                        openedCards.forEach(function(ele){
                        ele.classList.remove("unmatch");
                        ele.addEventListener("click", showCard );
                        ele.addEventListener("click", opened_cards );
                        });
                        openedCards = [];  

                    },500);
                
                      
                } 
          } // close of outer if        
                    
   } // close of function opened_cards                  
   
    // declaration of array_shuffle function 
  
   function array_shuffle(arr){
    
    var empty_place_for_swapping;
      for (var j = arr.length-1 ; j > 0 ; j--){
            var random_index = Math.floor(Math.random() * (j+1));
            empty_place_for_swapping = arr[random_index];
            arr[random_index] = arr[j];
            arr[j] = empty_place_for_swapping ;
      }
      return (arr);
   };
     
      // declaration of function putInsideHtml 

   function putInsideHtml(arr){
      var cards_area = document.getElementsByClassName("arrange");
       for(var x = 0 ; x <= 3 ; x++){ 
          cards_area[0].appendChild(arr[x]);       
       }
       for(var x = 4 ; x <= 7  ; x++){ 
          cards_area[1].appendChild(arr[x]);
       }
       for(var x = 8 ; x <= 11 ; x++){ 
          cards_area[2].appendChild(arr[x]);     
       }
       for(var x = 12 ; x <= 15 ; x++){ 
          cards_area[3].appendChild(arr[x]);
       }
       // adding open class to all cards
       arr.forEach(function(element){
        element.classList.add("open");
        });
   };

      // declaration of counter function
      
      var counter_play;
   function call_counter(){
        var seconds = 0;
        var minutes = 0;
       // var hours = 0 ;
        counter_play  =  setInterval(function(){
          document.getElementById("counter_show").innerHTML = minutes +" min:" + seconds +" sec";
          seconds ++;
          
          if (seconds == 59){
            minutes ++ ;
            seconds = 0 ;
          }
        
        },1000);
   };

 // declaration of moves_counter function
   function  moves_counter(){
      no_moves ++  ;
     document.getElementById("moves").innerHTML = no_moves +" moves";
            /* RATING */
     // case of 3 stars rating
    
     if (no_moves>=9 && no_moves<=12) {
        stars[2].style.visibility = "hidden";
        
     }
     else if(no_moves>12){
        stars[1].style.visibility = "hidden";

     }
     

   }  // close of moves_counter function
  function disapear(){
    document.getElementById("popUpFinal").style.display = "none";
    document.getElementById("final_rate").innerHTML = "";
  }