  const ctx2 = document.getElementById('lineChart').getContext('2d');

  //getting items from the local storage
  const data = JSON.parse(localStorage.getItem('data'));
  console.log(data);


  const photo=document.getElementById('photo')
  const username=document.getElementById('name')
  const bio=document.getElementById('bio')
  const userlocation=document.getElementById('user_location')
  const usercompany=document.getElementById('user_company')
  const userFollowers=data.followers
  const userFollowing=data.following
  const noOfRepos=document.getElementById("repos")

  //get all details an put it in the respective positions 
photo.setAttribute("src",data.avatar_url)
username.innerText=data.name || "NA"
bio.innerText=data.bio || "NA"
userlocation.innerText=data.location ||"NA"
usercompany.innerText=data.company || "NA"
noOfRepos.innerText=data.public_repos;




//api calls
async function getEventsUrl(eventsUrl, eventsCount){
  try{
   const response= await fetch(eventsUrl);
   if(response.status==200)
   {
    const results=await response.json()
  //  console.log("The data is", data2)

    results.forEach(result => {
      const eventType=result.type;
      if(eventsCount[eventType]){
        eventsCount[eventType]++;
      }
      else{
        eventsCount[eventType]=1;
      }
    });
  
  console.log(eventsCount)
   }
  }
  catch(error){
    console.log("The error is", error)
  }
}


//charts

//chart 1
let ctx = document.getElementById('myPieChart').getContext('2d');
let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Followers', 'Following'], // Labels for the slices
          datasets: [{
              data: [userFollowers, userFollowing], // Data for each slice
              backgroundColor: ['#3CB371', '#66CDAA'], // Colors for each slice
              hoverBackgroundColor: ['#A3BE8C', '#8FBC8F'] // Colors when hovering
          }]
      },
      options: {
          responsive: true, // Makes the chart responsive
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'top', // Position of the legend
              },
              tooltip: {
                  enabled: true, // Enable tooltipsss
              }
          }
      }
  });

  //chart 2
async function populate(){
  let eventsUrl=data.events_url;
  eventsUrl = eventsUrl.replace("{/privacy}", "");  
  const eventsCount={}

  await getEventsUrl(eventsUrl, eventsCount);

  console.log("in populate", eventsCount["PushEvent"])

  let ctx1 = document.getElementById('barChart').getContext('2d');
  let myBarChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: [
          'PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'DeleteEvent',
          'ForkEvent', 'WatchEvent', 'ReleaseEvent', 'CommitCommentEvent', 'IssueCommentEvent',
          'PullRequestReviewEvent', 'PullRequestReviewCommentEvent', 'MemberEvent', 'PublicEvent',
          'RepositoryEvent', 'GollumEvent', 'DeploymentEvent', 'DeploymentStatusEvent', 'PingEvent',
          'PackageEvent', 'WorkflowRunEvent', 'SecurityAdvisoryEvent', 'DiscussionEvent'
      ],
      
        datasets: [{
            label: 'Events performed by the user',
            data: [
                eventsCount.PushEvent,
                eventsCount.PullRequestEvent,
                eventsCount.IssuesEvent, 
                eventsCount.CreateEvent,
                eventsCount.DeleteEvent,
                eventsCount.ForkEvent,
                eventsCount.WatchEvent,
                eventsCount.ReleaseEvent,
                eventsCount.CommitCommentEvent,
                eventsCount.IssueCommentEvent,
                eventsCount.PullRequestReviewEvent,
                eventsCount.PullRequestReviewCommentEvent,
                eventsCount.MemberEvent,
                eventsCount.PublicEvent,
                eventsCount.RepositoryEvent,
                eventsCount.GollumEvent,
                eventsCount.DeploymentEvent,
                eventsCount.DeploymentStatusEvent,
                eventsCount.PingEvent,
                eventsCount.PackageEvent,
                eventsCount.WorkflowRunEvent,
                eventsCount.SecurityAdvisoryEvent,
                eventsCount.DiscussionEvent
               ],
            backgroundColor: '#3bb371',
            borderColor: '#3bb371',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
              beginAtZero: true, // Ensures the y-axis starts at 0
              min: 0, // Set minimum value for y-axis
              max: 100, // Set maximum value for y-axis
              ticks: {
                stepSize: 6 // Adjust step size if needed
              }          
            }
        }
    }
  });
}

populate();

//chart 3
//api calling
let received_events=data.received_events_url;
console.log("receievd event sis ",received_events)
getReceivedEvents(received_events);

async function getReceivedEvents(received_events){
  try{
  let response=await fetch(received_events)
  let results;
  if(response.status==200){
    results=await response.json();
    console.log("The result is ", results)

    //process the result
    pushEventObj={};
    IssuesEventObj={};
    PullRequestEventObj={};
    CreateEventObj={}
    const MAX_EVENTS=10

    results.forEach(result=>{
        if(result.type=="PushEvent"){
      
          let creationDate=result.created_at
          const date=creationDate.split('T')[0]
          if (Object.keys(pushEventObj).length < MAX_EVENTS){

          if(pushEventObj[date]){
            pushEventObj[date]++;
          }
          else{
            pushEventObj[date]=1
          }
         
        }
      }
      
       else if(result.type=="IssuesEvent"){
      
          let creationDate=result.created_at
          const date=creationDate.split('T')[0]
          if (Object.keys(IssuesEventObj).length < MAX_EVENTS){

          if(IssuesEventObj[date]){
            IssuesEventObj[date]++;
          }
          else{
            IssuesEventObj[date]=1
          }
         
        }
      }
        else if(result.type=="PullRequestEvent"){
      
          let creationDate=result.created_at
          const date=creationDate.split('T')[0]
          if (Object.keys(PullRequestEventObj).length < MAX_EVENTS){

          if(PullRequestEventObj[date]){
            PullRequestEventObj[date]++;
          }
          else{
            PullRequestEventObj[date]=1
          }
         
        }
      }
        else if(result.type=="CreateEvent"){
      
          let creationDate=result.created_at
          const date=creationDate.split('T')[0]
          if (Object.keys(CreateEventObj).length < MAX_EVENTS){

          if(CreateEventObj[date]){
            CreateEventObj[date]++;
          }
          else{
            CreateEventObj[date]=1
          }
         
        }
      }
      
    })
    console.log(CreateEventObj)
    console.log(PullRequestEventObj)
    console.log( IssuesEventObj)
    console.log(pushEventObj)

    const pushEventDates = Object.keys(pushEventObj);
    const issuesEventDates = Object.keys(IssuesEventObj);
    const pullRequestEventDates = Object.keys(PullRequestEventObj);
    const createEventDates = Object.keys(CreateEventObj);

    const allDates = [
  ...pushEventDates,
  ...issuesEventDates,
  ...pullRequestEventDates,
  ...createEventDates
];
const uniqueDatesSet = new Set(allDates);
const uniqueDates = Array.from(uniqueDatesSet);

function populateData(eventObj, uniqueDates) {
  return uniqueDates.map(date => eventObj[date] || 0);
}

const pushEventData = populateData(pushEventObj, uniqueDates);
const issuesEventData = populateData(IssuesEventObj, uniqueDates);
const pullRequestEventData = populateData(PullRequestEventObj, uniqueDates);
const createEventData = populateData(CreateEventObj, uniqueDates);



    //chart 3
    let myLineChart=new Chart(ctx2, {
      type: 'line',
      data: {
        labels: uniqueDates, // Dates
        datasets: [
          {
            label: 'PushEvent',
            data: pushEventData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'IssuesEvent',
            data: issuesEventData,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'PullRequestEvent',
            data: pullRequestEventData,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'CreateEvent',
            data: createEventData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Events'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          },
          title: {
            display: true,
            text: 'User and Contributor Interaction Patterns Across Repositories'
          }
        }
      }
    });

    
    
  }
}
 catch(e){
  console.log(e)
}
}


//div 3 api calling
console.log("Reposssss is :",data.repos_url+"?per_page=10")
const parentDiv=document.getElementById('parentDiv');



topTenrepos(data.repos_url+"?per_page=10")

async function topTenrepos(url){
  console.log("insdie funnn")
try{
  let response=await fetch(url);
  let results;
  if(response.status==200){
    results=await response.json();
  }
  console.log("inside")
  console.log(results)

  //add data into the card 
  results.forEach(result=>{
    const newOne = result.git_url.replace("git://", "").replace(".git", "");
    const newLink="https://"+newOne
    console.log("linkkkk:", newOne)
    console.log("linkkkk:", newLink)
    console.log("running for this time")
  const cardDiv=document.createElement('div')
  cardDiv.className="border rounded-xl flex flex-col p-4 space-y-5 bg-[#f8f9f8]"
  cardDiv.innerHTML=
 `<div class="flex flex-row justify-between space-x-10 md:max-w-screen-md">
  <p class="font-bold">${result.name}</p>
  <a href="${newLink}" class="bg-[#3bb371] border border-white w-[100px] h-5 rounded-xl text-[10px] shadow-md hover:transition-all scale-105 inline-block text-center items-center justify-center" target="_blank" rel="noopener noreferrer">
  Link  
 </a>
</div>
<p>${result.description}</p>
<div class="flex justify-between">
  <p class="font-bold">Fork <span>${result.forks_count}</span></p>
  <button class="bg-[#000080] text-white font-bold border border-white w-20 max-w-[100%] h-5 rounded-xl text-[10px] shadow-md hover:transition-all scale-105">
      ${result.language}
  </button>
</div>`

parentDiv.appendChild(cardDiv)
  })
}
catch(e)
{
  console.log(e)
}
}