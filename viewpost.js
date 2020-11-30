/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url =(window.location).toString();
var forumname;
var course;
var subforum;
var post;
var queryPos;
var title= "Homework 6"; //dummy data
var postStatus = "flagged";
function getInfo() {
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	queryPos = pos;
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/&subforum=/);
		var postPos = forumName.search(/&postid=/);
		course = forumName.substring(coursePos+7, subforumPos);
		post = forumName.substring(postPos);
		subforum = forumName.substring(subforumPos+10, postPos);
		forumName = course + " " + subforum;
		//console.log('"'+ admin + '"');
		var flagbtn = document.getElementById("flag");
		flagbtn.setAttribute("onchange", "Flagfunc(this,'"+post+"post-header');");

		var posth = document.getElementById("post-header");
		posth.setAttribute("id", post+"post-header");
		var inner;
		if (postStatus === "NULL")
			inner = title; //Placeholder for PHP
		else if (postStatus === "flagged") {
			inner = title + " -- FLAGGED"; //Placeholder for PHP
			document.getElementById("flag").checked = true;
			document.getElementById("flag").disabled = true;
		}
		else if (postStatus === "locked") {
			inner = title + " -- LOCKED";
			document.getElementById("flaglabel").style.visibility = "hidden";
			document.getElementById("flag").style.visibility = "hidden";
			document.getElementById("rplybutton").style.visibility = "hidden";
			
		}
		posth.innerHTML = inner;	
		
		var profilebox = document.getElementById("profile-pic");
		var profilepic = document.createElement("img");
		
		//TODO: get user's profile picture
		var profile_src = "images/profilepicture.png";//Placeholder
		profilepic.setAttribute("src", profile_src);
		profilepic.setAttribute("alt", "Author's profile picture");
		profilepic.setAttribute("class", "post-profile-picture");
		profilebox.appendChild(profilepic);
		var user = document.getElementById("username");
		user.innerHTML = getUserName(post);//PHP Placeholder: Get user name from database
		
		
		//TODO: get post content
		var postcont = document.getElementById("post-content");
		postcont.innerHTML = getPostContent(post); //Placeholder
		
		//TODO: Get replies
		getReplies(post);
		
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
	}
	else {
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.html";
	}
}
function getUserName(postid) {
	return "Mhealyssah Bustria"; //Dummy Data
}

function getPostContent(postid) {
	return "Where do I store my mySQL scripts?";
}

function getReplies(postid) {
	var replies = new Array(); //Placeholder for PHP function
	replies = [["RE: Homework 6", "Bartholomew Falzarano", "104", "You can store them in your home directory on the server.", "NULL"]];
	var replies_dom = document.getElementById("replies");
	if (replies.length == 0) {
		replies_dom.innerHTML = 'This post does not have any replies yet.';
		replies_dom.setAttribute("class", "reply-msg");
	}
	else {
		for (var i = 0; i < replies.length; i++) {
			var postDiv = document.createElement("div");
			postDiv.setAttribute("class", "vpcontainer");
			postDiv.setAttribute("id", replies[i][2]);
			var head = document.createElement("div");
			head.setAttribute("class", "headerbox");
			var postTitle = document.createElement("h2");
			postTitle.setAttribute("id", replies[i][2]+"post-header");
			postTitle.innerHTML = replies[i][0];
			postTitle.setAttribute("class", "postheader");
			head.appendChild(postTitle);
			postDiv.appendChild(head);
			
			var profile_sec = document.createElement("div");
			profile_sec.setAttribute("class", "profileandbody");
			var authorsec = document.createElement("div");
			authorsec.setAttribute("class", "profilebox");
			var user = document.createElement("div");
			user.setAttribute("class", "indent");
			user.setAttribute("id", replies[i][1]);
			user.innerHTML = replies[i][1];
			authorsec.appendChild(user);
			var bodycont = document.createElement("div");
			bodycont.setAttribute("class", "bodybox");
			bodycont.innerHTML = replies[i][3];
			
			profile_sec.appendChild(authorsec);
			profile_sec.appendChild(bodycont);
			
			var userControls = document.createElement("div");
			userControls.setAttribute("id", replies[i][2]+"user-controls");
			userControls.setAttribute("class", "viewprofilebuttons");
			
			// var flagLbl = document.createElement("label");
			// flagLbl.setAttribute("class", "flag-post floatright");
			// flagLbl.setAttribute("for", "flag"+replies[i][2]);
			// var flaginput = document.createElement("input");
			// flaginput.setAttribute("type", "checkbox");
			// flaginput.setAttribute("id", "flag"+replies[i][2]);
			// flaginput.setAttribute("onchange", "Flagfunc(this,'" + replies[i][2]+"post-header');");
			// flagLbl.innerHTML = "Flag Post" ;
			// flagLbl.appendChild(flaginput);
			// //var replyBtn = document.createElement("button");
			// //replyBtn.setAttribute("id", replies[i][2]+"b");
			// //replyBtn.setAttribute("onclick", "newPostReply(this.id)");
			// //replyBtn.innerHTML = "Reply";
			// userControls.appendChild(flagLbl);
			// //userControls.append(replyBtn);
			

			
			
			
			
			postDiv.appendChild(profile_sec);
			postDiv.appendChild(userControls);
			replies_dom.appendChild(postDiv);
		}
		
	}
}

function newReply() {
	window.location.href = "new_post.html?"+ (window.location).toString().substring(queryPos+1);
}

function newPostReply(id) {
	id = id.substring(0, id.length - 1);
	window.location.href = "new_post.html?course=" + course + "subforum=" + subforum + "postid=" + id;
	
}


function Flagfunc(element, header)
{
	//console.log(header);
    var head = document.getElementById(header);
	head.innerHTML += " -- FLAGGED";
	element.disabled = true;
}



function logout() {
	
	
	window.location.href="index.html";
	
}