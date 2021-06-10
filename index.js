



var btn=$('#fetch')

// dom element we are trying to manipulate in order to show data on front end
let persons=$('#personsDiv')
let person= $('#displayDiv')

btn.click(()=>{
    try{
        // similar to axios we have ajax in jquery to fetch data from api
        persons[0].innerHTML=" loading..."
        $.ajax({
            url:"https://ghibliapi.herokuapp.com/people",
            dataType:"json",
            type:"get",
            async:"true",
        
            success: (data)=>{
                // this function runs after fetching data sucessfully, data var contains fetched data here 
                // storing the names from data into variable names
                
                let names= data.map(item=>`<button value =${item.id} onclick="userDetailsFn(value)">${item.name}</button>`)
  

                

    
                console.log(data)
                // manipulating the dom element and storing names inside it using innerHTMl
                persons[0].innerHTML=names
                // $('<p>Hello there</p>').appendTo(person);
            

            },
            error: function (xhr, exception) {
                console.log("error",exception,xhr)
            }
        })
    }
    catch(err){
        console.log("error in fetching",err)
    }
}
)


function userDetailsFn(id){

try{
    console.log("loading user specific data")
    console.log(id)
    $.ajax({
        url:`https://ghibliapi.herokuapp.com/people/${id}`,
        dataType:"json",
        type:"get",
        async:"true",
    
        success: (userData)=>{
            person[0].style.display="flex";
            console.log({userData,person})
            person[0].innerHTML= `<ul>
                    <li>name:${userData.name}</li>
                    <li>age:${userData.age}</li>
                    <li>gender:${userData.gender}</li>
                    <li>eye-color:${userData.eye_color}</li>
                    <li>hair-color:${userData.hair_color}</li>
                    
                </ul>
                ${userData.films.map(item=>item)}`
    
        },
        error: function (xhr, exception) {
            console.log("error",exception,xhr)
        }
    })
}

catch(err){
    console.log("error in fetching user details",err)
}

}

