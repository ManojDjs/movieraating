// const axios = require('axios');
function join_array(ratings){
    var R=''
    for(let i of ratings){
        R+=i.Source+":"+i.Value
        
    }
    return R;
}
async function getmovieslist(searchterm){
    const title=searchterm;
    const apikey="ed992f4e";
    const movies=await fetch("http://www.omdbapi.com/?s="+title+"&apikey="+apikey).then((Response)=>{
    if(!Response.ok){
        throw new Error("erroe");
      }
      Response.json().then((data)=>{
        //   console.log(data)
        for(let i of data.Search){
            var option=document.createElement("a");
            var x = document.createElement("li");
            x.classList.add('card');
            x.style="width: 18rem;"
            //appending image
            var img = document.createElement("img");
            img.style="height:3rem;"
            img.style="width:3rem;"
            img.src=i.Poster;
            x.appendChild(img)

           //creating body
            var div=document.createElement("div");
            div.classList.add("card-body");
            

            var t = document.createElement("h5");
            t.innerText=i.Title;
            t.classList.add("card-title");
            movietext=document.createElement('p');
            movietext.innerText="year:"+i.Year;
            
        

            div.appendChild(t)
            div.appendChild(movietext)
            x.appendChild(div);
            
            const mlist=document.getElementById("movieslist");
            mlist.appendChild(x);



            x.addEventListener("click",()=>{
                console.log("you clicked:"+i.imdbID);
                const myNode=document.getElementById("movieslist");
                myNode.innerHTML = '';
                async function getmovie(imdbID){
                    const title=imdbID;
                    const apikey="ed992f4e";
                    const movies=await fetch("http://www.omdbapi.com/?i="+title+"&apikey="+apikey).then((Response)=>{
                        if(Response.ok){
                        Response.json().then((data)=>{
                            console.log(data)
                
                            var option=document.createElement("a");
                                var x = document.createElement("li");
                                x.classList.add('card','mb-3');
                                // x.style="max-width: 540px;";
/// row appending
                            var row=document.createElement('div');
                            row.classList.add('row','g-0');

// class appending
                                var c1=document.createElement('div');
                                c1.classList.add('col-md-4');
                                //appending image

                                var img = document.createElement("img");
                                img.classList.add('card-img-top');
                                img.style="height:10rem;"
                                img.style="width:15rem;"
                                img.src=data.Poster;
                                c1.appendChild(img)



/// col 2
                            var c2=document.createElement('div');
                            c2.classList.add('col-md-8');
                            //creating body
                            
                                var div=document.createElement("div");
                                div.classList.add("card-body");
                                

                                var t = document.createElement("h1");
                                t.innerText=data.Title;
                                t.classList.add("card-title");
                                div.appendChild(t);
                                //year
                                movietext=document.createElement('h4');
                                movietext.innerText="year:"+data.Year;
                                div.appendChild(movietext);
                                //ratings
                                movier=document.createElement('h3');
                                movier.innerText="Rating:"+join_array(data.Ratings);
                                div.appendChild(movier);
                                //awards
                                moviea=document.createElement('p');
                                moviea.innerText="Awards:"+data.Awards;
                                div.appendChild(moviea)
                                //actors
                                movieac=document.createElement('h3');
                                movieac.innerText="Actors:"+data.Actors;
                                div.appendChild(movieac)
                                //boxoffice
                                moviebf=document.createElement('h5');
                                moviebf.innerText="Boxoffice:"+data.BoxOffice;
                                div.appendChild(movieac)
                                //plot
                                movieplot=document.createElement('p');
                                movieplot.innerText="Plot:"+data.Plot;
                                div.appendChild(movieplot);
                            

                                
                                
                                
                                c2.appendChild(div);
                                row.appendChild(c1);
                                row.appendChild(c2);
                                x.appendChild(row);
                                const moviel=document.getElementById("movieslist");
                                moviel.appendChild(x);
                        })
                        }
                })
                }
                getmovie(i.imdbID);
            })

        }
      })
    }).catch((err)=>{
      console.log("error rejected the api");
      console.log(err);
    });
}
// getmovieslist("avengers")
const searchbutton=document.querySelector('input');
searchbutton.addEventListener('input',(event)=>{
    const myNode=document.getElementById("movieslist");
    myNode.innerHTML = '';
    getmovieslist(event.target.value)
    
})