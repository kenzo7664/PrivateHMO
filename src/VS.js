const profileIt = [
    {
      id: 1,
      company: "Photosnap",
      logo: "./images/photosnap.svg",
      new: true,
      featured: true,
      position: "Senior Frontend Developer",
      role: "Frontend",
      level: "Senior",
      postedAt: "1d ago",
      contract: "Full Time",
      location: "USA Only",
      languages: ["HTML", "CSS", "JavaScript"],
      tools: []
    },
    {
      id: 2,
      company: "Manage",
      logo: "./images/manage.svg",
      new: true,
      featured: true,
      position: "Fullstack Developer",
      role: "Fullstack",
      level: "Midweight",
      postedAt: "1d ago",
      contract: "Part Time",
      location: "Remote",
      languages: ["Python", false],
      tools: ["React"]
    },
    {
      id: 3,
      company: "Account",
      logo: "./images/account.svg",
      new: true,
      featured: false,
      position: "Junior Frontend Developer",
      role: "Frontend",
      level: "Junior",
      postedAt: "2d ago",
      contract: "Part Time",
      location: "USA Only",
      languages: ["JavaScript"],
      tools: ["React", "Sass"]
    },
    {
      id: 4,
      company: "MyHome",
      logo: "./images/myhome.svg",
      new: false,
      featured: false,
      position: "Junior Frontend Developer",
      role: "Frontend",
      level: "Junior",
      postedAt: "5d ago",
      contract: "Contract",
      location: "USA Only",
      languages: ["CSS", "JavaScript"],
      tools: []
    },
    {
      id: 5,
      company: "Loop Studios",
      logo: "./images/loop-studios.svg",
      new: false,
      featured: false,
      position: "Software Engineer",
      role: "Fullstack",
      level: "Midweight",
      postedAt: "1w ago",
      contract: "Full Time",
      location: "Worldwide",
      languages: ["JavaScript"],
      tools: ["Ruby", "Sass"]
    },
    {
      id: 6,
      company: "FaceIt",
      logo: "./images/faceit.svg",
      new: false,
      featured: false,
      position: "Junior Backend Developer",
      role: "Backend",
      level: "Junior",
      postedAt: "2w ago",
      contract: "Full Time",
      location: "UK Only",
      languages: ["Ruby"],
      tools: ["RoR"]
    },
    {
      id: 7,
      company: "Shortly",
      logo: "./images/shortly.svg",
      new: false,
      featured: false,
      position: "Junior Developer",
      role: "Frontend",
      level: "Junior",
      postedAt: "2w ago",
      contract: "Full Time",
      location: "Worldwide",
      languages: ["HTML", "JavaScript"],
      tools: ["Sass"]
    },
    {
      id: 8,
      company: "Insure",
      logo: "./images/insure.svg",
      new: false,
      featured: false,
      position: "Junior Frontend Developer",
      role: "Frontend",
      level: "Junior",
      postedAt: "2w ago",
      contract: "Full Time",
      location: "USA Only",
      languages: ["JavaScript"],
      tools: ["Vue", "Sass"]
    },
    {
      id: 9,
      company: "Eyecam Co.",
      logo: "./images/eyecam-co.svg",
      new: false,
      featured: false,
      position: "Full Stack Engineer",
      role: "Fullstack",
      level: "Midweight",
      postedAt: "3w ago",
      contract: "Full Time",
      location: "Worldwide",
      languages: ["JavaScript", "Python"],
      tools: ["Django"]
    },
    {
      id: 10,
      company: "The Air Filter Company",
      logo: "./images/the-air-filter-company.svg",
      new: false,
      featured: false,
      position: "Front-end Dev",
      role: "Frontend",
      level: "Junior",
      postedAt: "1mo ago",
      contract: "Part Time",
      location: "Worldwide",
      languages: ["JavaScript"],
      tools: ["React", "Sass"]
    }
  ]
  
  function newItem(profileIt) {
      let itemNew = ""
      if (profileIt.new) 
      itemNew +=`<button class="new">new!</button>`
      return itemNew
  }
  
  function featureItem(profileIt){
      let itemFeature = "" 
      if (profileIt.featured) 
  itemFeature += `<button class="featured">featured</button>`
  return itemFeature
          
      
  }
  
  
  
  
  
  
  const container = document.querySelector(".container")
  
  window.addEventListener('DOMContentLoaded', function () {
     
      displayProfileItems(profileIt)
  })
  
  
  
  function displayProfileItems(profileItems) {
     
      let displayItems = profileItems.map(function (item) {
        return `<article class="profile">
    <img src=${item.logo} alt=${item.logo}  class="logo">
    <div class="profile-header">
      <h5 class="company">${item.company}</h5>
    ${newItem(item)}
    ${featureItem(item)}
    </div>
    <h3 class="position">
      ${item.position}
    </h3>
    <ul>
      <li id="cont" class="time">${item.postedAt}</li>
      <li class="time">${item.contract}</li>
      <li class="time">${item.location }</li>
    </ul>
    <div class="filter">
      <button class="filter-btn" type="button" data-id="">
        ${item.role}
      </button>
      <button class="filter-btn" type="button" data-id="">
        ${item.level}
      </button>
      
        
      
    </div>
  </article>`  
          
      })
      displayItems = displayItems.join("")
  container.innerHTML = displayItems
      
  }