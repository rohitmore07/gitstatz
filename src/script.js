
const hamburger_button=document.getElementById('hamburger_button');
const menu=document.getElementById('menu');
const hero_section=document.getElementById('hero_section');
const reviewUs=document.getElementById('reviewUs');
const body=document.getElementById('body');
const navBar=document.getElementById('navBar');
const h1Heading=document.getElementById('h1Heading')
const subHeading=document.getElementById('subheading')
const howItWorks=document.getElementById('howItWorks')
const no1=document.getElementById('no1')
const no2=document.getElementById('no2')
const no3=document.getElementById('no3')
const moonIcons=document.querySelectorAll('.moon-icon');
const getInsights=document.getElementById('getInsights')


reviewUs.addEventListener('click', (e)=>{
  window.open('https://x.com/rohittmore', '_blank');
})

let windowsColor='on'
let toggle='on';

//to add the hamburger meu or not
hamburger_button.addEventListener('click',(e)=>{
    console.log('Hamburger clicked ')
    if(toggle=='on'){
    menu.classList.remove('hidden')
    toggle='off';
    }
    else if(toggle=='off'){
        menu.classList.add('hidden')
        toggle='on';
        }
})

//For light and dark modes
moonIcons.forEach(moon=>{
  moon.addEventListener('click',(e)=>{
    console.log('Review Us clicked')
    if (!windowsColor || !body) {
      console.error('Elements not found');
      return;
    }
    
    else if(windowsColor==='on'){
      body.classList.add('bg-gray-700')
      navBar.classList.add('text-white')
      h1Heading.classList.add('text-white')
      subHeading.classList.add('text-gray-400')
      howItWorks.classList.add('text-white')
      no1.classList.add('text-gray-600')
      no2.classList.add('text-gray-600')
      no3.classList.add('text-gray-600')
      moon.setAttribute('src', 'assets/Icons/sun_svg.svg')
      windowsColor='off'
    }
    else if(windowsColor==='off'){
      body.classList.remove('bg-gray-700')  
      navBar.classList.remove('text-white')
      h1Heading.classList.remove('text-white')
      subHeading.classList.remove('text-gray-400')
      howItWorks.classList.remove('text-white')
      no1.classList.remove('text-gray-600')
      no2.classList.remove('text-gray-600')
      no3.classList.remove('text-gray-600')
      moon.setAttribute('src', 'assets/Icons/moon_svg.svg')
  
      windowsColor='on'
    }
  })
  
  
})


async function getDetails(userName){
  try{
    let response=await fetch(`https://api.github.com/users/${userName}`);
    let data;
    if(response.status==200)
       data=await response.json()
    else 
       return null;
    console.log(response)
    console.log(data)


    console.log(`response.url is ${response.url}`)
    console.log(`https://api.github.com/users/${userName}`==response.url)
    console.log(response.body)
    
    return data;
  }
  catch(error){
    console.log(error)
  }
}

//To move to the next analytics page
//API CALLING

getInsights.addEventListener('click', async(e)=>{ 
   userName=gitUserName.value;
   console.log(userName);
   try {
    let data = await getDetails(userName);
    console.log("Data in event listener:", data);
    if(data) 
      localStorage.setItem('data', JSON.stringify(data))
      console.log('local storage data is', localStorage.getItem('data'))
      window.location.href = 'analytics.html';
      

  } catch (error) {
    console.error('Error in event listener:', error +"no user found");
  }

})




