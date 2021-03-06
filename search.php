<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	if (!isset($_SESSION["user"])){
		header("location:login.php");
		exit();
	}

	
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for the search page.
			
-->

<html lang="en">
	<head>
		<!--Page Information-->
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script type="text/javascript" src="search.js"></script>
		<script type="text/javascript" src="nav.js"></script>
	</head>
	
	<body class="pagestyle">
		<div id="navlist" class="navlist"> 
			<div>
				<img class = "logo"  src="images/cr_logo_plain.png" alt="Cougar Rescue Forum Logo"/>
			</div>
				<!-- seach bar left align -->
			<div class="search"> 
				<form action="search.php"> 
					<input aria-label="search" type="text" placeholder=" Search forum topics" name="search" id="searchInput" required /> 
					<button aria-label="search" type="submit"> <i class="fa fa-search" ></i> </button> 
				</form> 
			</div> 
			<!--Coming back to this-->
			<form id="logoutForm" method="post" action="logout.php">
				<input name="logout" aria-label="logout" type="submit" class="logoutNav" value="Logout"/>
			</form> 
			<a href="search.php">Search</a>
			<a href="view_profile.php">Profile</a>
			<a href="main.php">Home</a> 
			
			  
		</div>
		
		<h1 class="admin" id="searchheading">Cougar Rescue Forum: Search</h1>
        <form  id="sorting" method="post">
            <label class="adminsubheadings dropdownlbl"  for="sortby">Sort By:
                <select id="sortby" name="sortby" size="1">
                    <option value="course_name" selected="selected">Course Name</option>
                    <option value="fname">First Name</option>
                </select>

                <input  aria-label="sortmethod" type="submit" value="Apply" name="sortmethod"/>
        </form></label>


		<p class="hiddenStyle" id="resultsInstr"></p>
		<div id="searchResults">
			<!--When the user searches, the search results will be appended here-->
		</div>
		<?php
            $db = mysqli_connect("db", "root", "test", "myDb");	
			//$db = mysqli_connect("db", "root", "test", "myDB");
            //$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
            if(mysqli_connect_errno()){
                print "Connect failed" . mysqli_connect_error();
                exit();
            }
            //search results
                if(isset($_GET["search"])){
                    $search_word = addslashes($_GET["search"]);
                    $search_query = "SELECT DISTINCT p.postID, p.title, p.content, p.subType, p.crsNumber, u.fname, u.lname 
                                            FROM Posts p, Users u
                                            WHERE p.userEmail = u.email
                                            AND (content LIKE '%" . $search_word . "%' OR title LIKE '%" . $search_word . "%')";
                    if(isset($_POST["sortby"])){
                        switch($_POST["sortby"]){
                            case "fname":
                                $search_query .= " ORDER BY u.fname;";
                                break;
                            case "course_name":
                                $search_query .= " ORDER BY p.crsNumber;";
                                break;
                            default:
                                break;
                        }
                    }
                    //print $search_query;
                    $search_result = mysqli_query($db, $search_query);
                    if(!$search_query){
                        print '<script type="text/javascrip">
                            alert("Error: the query could not executed."'. mysqli_error(). ');</script>';
                        exit();
                    }
                    $search_row = array();
                    while($r = mysqli_fetch_assoc($search_result)){
                        $values = array_values($r);
                        $searchrow[] = $values;
                    }
                    print "<script type='text/javascript'>searchForum(" . json_encode($searchrow) . ");</script>";

                }



            mysqli_close($db);

            
        ?>
		
	</body>
	
</html>