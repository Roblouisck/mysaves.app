<h1 align="center"> <a href="https://mysaves.app">MySaves</a>.app for reddit</h1>
<h3 align="center">Filter through your reddit saves quickly and efficiently</h1>
<img src="https://i.imgur.com/YZYOloo.png">

## 📜 [Information for New Users ](#this-link-is-just-for-styling)

### Features:
* See all your saves quickly, numbered, and in chronological order by when they were saved.
* Filter saves by only threads, only comments, or only specific subreddit
* When filtered, saves automatically group together by subreddit, with subreddit groups listed in alphabetical order.
* Search all your saves in real time

*As of August 2019  these features are not included in reddits default user experience.*


**Note:** Reddit only stores your most recent 984 saves. Thus, the max number of saves that can be displayed by the All Saves tab will be 984. 

### Compatibility
Mysaves.app is compatible with desktops, mobile devices, and tablets when accessed with Chrome or Firefox.

### Firefox: 
If you use Firefox, make sure to turn off tracking or you may be stuck at fetching saves. Tracking is required for Oauth authentication through reddit.

<details>
<summary>Steps to disable tracking</summary>

### 1. Click the padlock then click custom
<img src="https://i.imgur.com/3Z0zzFQ.jpg">

### 2. Uncheck trackers
<img src="https://i.imgur.com/ql0r1op.jpg">

### 3. Click the key then click the trackers tab to observe that the only tracker is oauth
<img src="https://i.imgur.com/Cz9Qbd9.jpg">
</details>

### Privacy: 
All reddit data is stored in each users individual browser. There is no backend server. All reddit data is visible and accessable only to each individual user. Therefore, your data is completely gone when you close your browser, and is not collected by me or a third party in any way. Moreover, the code for this app is 100% open source and can be run on your local machine. The steps to do so are at the bottom of this page.


## 💻 [About the Project](#this-link-is-just-for-styling)
### Tech Stack:
* **Framework:** React
* **State management:** Redux
* **Styling:** Vanilla CSS 
* **Hosting:** Netlify
* **Editor:** Sublime Text 3

### Initial Goals:
My initial goals were pretty modest. I wanted to learn redux by building something, and I wanted to improve the quality of life of reddit users by implementing functionality I thought should've been part of the site. 

### What I Learned From the Project:
* **APIs and User Authentication**
	* Before this project I had never worked with an API, or user authentication (in this case Oauth2). I relied mostly on the official documentation (which was slim) and fiddling around to figure things out. Now I understand client ids, access tokens,  get requests, asnyc/await, promises etc. I also learned how to retrieve query params from the url, and hide sensitive data like the client ID in ENV variables.

* **Pagination**
	* I had never worked with pagination before this. The pagination component was the first component I wrote after I got Oauth2 working.

* **Redux**
	* Going into this project I had minimal redux experience (tutorials), which can be observed in my initial commits, as I wasn't using switch statements or using an initial state object to store my payloads as key/value pairs. At some point early on I had the presence of mind to cross reference what I was doing by studying other open source projects written with redux. This allowed me to self-correct early and quickly. After finishing this project I understand thoroughly how dispatching actions interact with reducers to modify redux state, and feel very comfortable using redux in future projects. 

* **Vanilla Javascript**
	* Likewise, before this project my understanding of JS was at a beginner level. When I needed functionality that I didn't know how to do I figured it out by reading MDN, w3schools, and utilizing stack overflow, usually reading old threads. Vanilla JS is used in various parts of the app, for example in Render.js it's used to replace the users window with the reddit login, and used to generate a random string for query param state. In MapAndSort.js I use it to decode various html symbols, and sort array data alphabetically. In Header.js I use it to add and remove various classes. All stuff I figured out as I went along.
	
* **Arrays**
	* Arrays (and objects) are the backbone of the app, and here's a quick summary of how I put them to use: All user save data is stored in an array of objects which gets scrubbed for key values, then those key values get sorted in alphabetical order (sort by object value) and mapped to HTML. Then I parse that HTML array using filter so I have three arrays--threads array, comments array, and all saves array. Lastly, I set up a function to determine which arrays to pull the HTML elements out of and display to users.

* **CSS** 
	* The extent of my CSS experience was that I built a todo app with grid and Bulma. This time around I wanted to expand my CSS knowledge, so I set out to build things from scratch. I learned how to utilize pseudo classes, nested targeting, adding and removing classes, media queries, animations, box-shadows, and more. I became very comfortable with the CSS box model and learned how tricky  it can be to get everything to play well together using  margin, padding, and border in conjunction with multiple grids. I also learned that it's much more efficient to debug and style CSS in the browser (chrome dev tools) rather than do it in your text editor. 

* **Git**
	* I find it pretty funny how I was using git before vs after this project. Before the only commands I knew were git add . , git commit -m, and git push. Now I regularly use git add --patch, diff, log, stash, stash pop, reset HEAD, merge, branch, checkout, force push and a few others. Along the way I had to deal with a couple merge conflicts, and retroactively remove individual files from the upstream repo. It was a lot of fun. There was also a sudden improvements in my git messages half way into the project when I realized I could separate out a title and body from the command line. 

* **Takeaways**
	 * I quickly realized that planning a layout design ahead of time is of critical importance. A big chunk of my dev time was eaten up by having to do CSS tweaks/fixes. I learned that when you're designing on the fly you're prone to introduce bugs into the layout, or have to redo pieces of the layout multiple times. To maximize efficiency one should always plan the layout in advance, and what I will be doing going forward. 
	* Second, I learned just how much goes into taking a web app from vague idea to real world application, and realistically how much is writing fresh code vs refactoring vs fixing bugs. Also, I got a realistic look at how code is broken by different browsers.
	* Lastly, how much thought and time goes into structuring code in a way that's easy for other developers to understand and read. Looking through my commits one can see all the different times I updated the names of variables, components, reducers, etc. simply for clarity. I want the code itself to be easy to understand, not only for other devs, but if I need to go back and read it.


## ⚙️  [Instructions to Deploy Locally](#this-link-is-just-for-styling)

		1. Clone or download this repository to your desktop (green button at the top)
		2. Download and install node.js LTS or Current from https://nodejs.org/en/
		3. Confirm node is installed by typing node -v in the command line
		4. Create a reddit account
		5. Go to https://www.reddit.com/prefs/apps
		6. Click create app
		7. Name it anything
		8. Click the installed app circle
		9. Paste http://localhost:3000/authorize_callback in for the redirect uri
		10. Click create app
		11. In the top left corner copy the string of characters shown under installed app
		12. In the project files navigate to src --> components --> Render.js
		13. Change ${process.env.REACT_APP_CLIENT_ID} to the string you just copied
		14. Change ${process.env.REACT_APP_URI} to http://localhost:3000/authorize_callback
		15. In the console navigate to the project folder and type npm install
		16. In the console navigate to the project folder and type npm start



## 😇 [Contributing](#this-link-is-just-for-styling)
### Why you should contribute?
* I have presented several easy contributions anyone can make below, explaining what each would entail
* We all use reddit, we all have saves, so improve it so you, I, and everyone else can enjoy it
* The source code is easy to read and understand for those with knowledge of react/redux
* I'm a new react/redux dev, it's possible there are many small refactors/improvements that can be made to the code
* The code base is small

### How you can contribute:
Below I'll identify some fixes and features I planned to implement but didn't have time to. At least for the moment I'll be moving on to work on a portfolio site, but if these contributions don't get made and there is still interest in this app when I finish I'll revisit these. Some of these fixes are quick and easy, and some are a little more involved, but here's what you can do to help:

<details>
<summary>Improve decoding of html </summary>
<h4>Problem:</h4> 
I used a heavy handed way of decoding html with .replace in MapAndSort.js. Some parts of the html naturally don't get shown properly this way. For example code snippets don't show code  blocks, bold/italics text don't show as bold/italics, etc.

<h4>Solution/steps:</h4> 
In MapAndSort.js look at the first mapping function where the saves const is set. Instead of grabbing save.data.body from the raw reddit data, I should have grabbed save.data.body_html. Make that change and rewrite my decodeHtml function to a real decode html function.
</details>

<details>
<summary>Increase cross-browser support</summary>
<h4>Problem:</h4> It would be optimal to have Edge and Safari working in addition to Chrome and Firefox. Edge has a small CSS problem with line breaks. Currently it breaks on character rather than word. I don't have ios so I couldn't/didn't run tests for safari. 

<h4>Solution/steps:</h4> 
Edge: Not sure on this one. It'll take some debugging. I tried text-overflow, overflow-wrap, word-break, word-wrap, and various properties for them when I was fiddling to try and get it working. I also deleted all the CSS during debugging and still couldn't get it to wrap properly, which means something in the HTML is causing a problem. Start by looking at .comments-grid-container and .save-wrapper.threadsOnly in the css. 
</details>

<details>
<summary>Implement jump to the top button</summary>
<h4>Problem:</h4> People with a lot of saves will have to scroll pretty far up to the top. This can be an inconvenience for mobile users.  

<h4>Solution/steps:</h4> 
Implement a discreet button following the theme of the ui  that lets users jump to the top. Make sure it blocks as little of the text content as possible--having it slide out might be a good idea. 
</details>

<details>
<summary>Implement unsave button</summary>
<h4>Problem:</h4> Well the only problem is that the app doesn't have this! It would be a pretty useful feature, especially in the threads only tab. It would be a small button next to src for comments and at the end of title for titles. 

<h4>Solution/steps:</h4> 
Check https://www.reddit.com/dev/api/oauth and ctrl+f to unsave. You'll have to write code to make a post request to reddits unsave api then attach it to a button. First thing you'll want to change though is to tell reddit/oauth you want access to the save scope of the reddit api for users who log in. You can do that by adding " save", no quotes, after history identity in the componentDidMount lifecycle method of Render.js. So the end of the window.location.replace code would be history identity save 
</details>

<details>
<summary>Fix favicon on chrome (mobile)</summary>
<h4>Problem:</h4> 
Chrome favicon still shows the reddit favicon in some cases. 

<h4>Solution/steps:</h4> 
Not sure, haven't sat down to debug this yet.
</details>

<details>
<summary>Users stuck at the login screen</summary>
<h4>Problem:</h4> 
For users who haven't logged into reddit prior to using my app they may become stuck at the log in screen. 

<h4>Solution/steps:</h4> 
Start by replicating the bug. Clear your browser data then try logging into the app before logging into reddit. Seems like it might be an oauth problem.
</details>

## 🧑 [About the Author](#this-link-is-just-for-styling)
[Robert Louis](https://github.com/Roblouisck) is a recent university graduate with a passion for building web applications and improving user experience. After graduating cum laude from UCLA he taught himself programming, and dove head first into frontend web development.

<details>
  <summary>img</summary>
<img src="https://i.imgur.com/cTMP7qW.jpg?1">
</details>
