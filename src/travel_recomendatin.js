async function fetchData(){
    try{
        const data = await (await fetch('data.json')).json();
        console.log(data)
        return data;
    }
    catch(err){
        console.log(err)
    }
}

document.getElementById('btnSearch').addEventListener('click',async ()=>{
    let keyword = document.getElementById('conditionInput').value.toLowerCase().trim();

    let res = '';

    if(keyword==='beach')
        keyword = 'beaches';
    if(keyword=='temple')
        keyword = 'temples';
    if(keyword=='country')
        keyword = 'countries'

    if(keyword==='beaches'||keyword==='temples'){
        const data = await fetchData();
        const array = data[keyword];
        let div = `<div class = "flex flex-col items-center"  style="background-color: rgba(51, 51, 51, 0.331);">`
        array.forEach(element => {
            console.log(element)
            div+=`<div class="flex flex-col items-left text-black"  style="background-color:rgba(255, 255, 255, 0.983);width:500px;height:400px;">
                <img class="my-4" src="${element.imageUrl}" style="width:500px;height:300px;"/>
                <h1 class="text-lg font-semibold text-blue-650 px-4">${element.name}</h1>
                <p class="mb-8 px-4">${element.description}</p>
            </div>`
            console.log(element.imageUrl)
        });
        div+="</div>"
        document.getElementById('res').innerHTML = div;
    }
    else if(keyword==='countries'){
        const data = await fetchData();
        const array = data[keyword];
        let div = `<div class = "flex flex-col items-center"  style="background-color: rgba(51, 51, 51, 0.331);">`
        array.forEach(element =>{
            div+=`
                <h1 class="text-2xl	 my-8 font-semibold">${element.name}</h1>
            `
            element.cities.forEach(city =>{
                div+=`<div class="flex flex-col items-left text-black"  style="background-color:rgba(255, 255, 255, 0.983);width:500px;height:400px;">
                <img class="my-4" src="${city.imageUrl}" style="width:500px;height:300px;"/>
                <h1 class="text-lg font-semibold text-blue-650 px-4">${city.name}</h1>
                <p class="mb-8 px-4">${city.description}</p>
                </div>`
            })
        })
        div+="</div>"
        document.getElementById('res').innerHTML = div;
    }
    //console.log(keyword)
})

document.getElementById('btnClear').addEventListener('click',()=>{
    document.getElementById('res').innerHTML = '';
})