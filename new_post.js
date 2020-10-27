function checkForum() {
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/subforum=/);
		var postPos = forumName.search(/postid=/);
		if (postPos == -1 ){
			course = forumName.substring(coursePos+7, subforumPos);
			subforum = forumName.substring(subforumPos+9);
			forumName = course + " " + subforum;
			var courseElem = document.getElementById("course-name");
			courseElem.innerHTML= course;
			
			var topicElem = document.getElementById("course-forum");
			topicElem.innerHTML= subforum;
			

		}
		else {
			course = forumName.substring(coursePos+7, subforumPos);
			subforum = forumName.substring(subforumPos+9, postPos);
			var courseElem = document.getElementById("course-name");
			courseElem.innerHTML= course;
			
			var topicElem = document.getElementById("course-forum");
			topicElem.innerHTML= subforum;
		}
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
		
	}
	else {
		//document.write("404: Page not found", "<br />", "Cannot access this page. You will be redirected to the main page.");
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.html";
	}	
}

function submission() {
	//TODO: Create new post/reply in database

	redirect();
	return false;
}

var forumName;
var course;
var subforum;

function redirect()
{
	forumName = (window.location).toString();
	var postPos = forumName.search(/postid=/);
	console.log(postPos);
	var pos = forumName.search(/\?/);
	var coursePos = forumName.search(/course=/);
	var subforumPos = forumName.search(/subforum=/);
	if (postPos == -1) {

		course = forumName.substring(coursePos+7, subforumPos);
		subforum = forumName.substring(subforumPos+9);
		console.log(course + " " + subforum);
		//window.location.back().back();
		window.location.href = "subforum.html?course=" + course + "subforum=" + subforum;
	}
	else {
		course = forumName.substring(coursePos+7, subforumPos);
		subforum = forumName.substring(subforumPos+9, postPos);
		var post = forumName.substring(postPos+7);
		window.location.href = "viewpost.html?course=" + course + "subforum=" + subforum + "postid=" + post;
	}
}