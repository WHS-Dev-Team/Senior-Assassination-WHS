<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sending registration details to admin
    $adminTo = "bryanchin922006@gmail.com";  
    $adminSubject = "New Senior Assassination 2024 Registration";
    
    $teamName = $_POST["teamName"];
    $teamLeader = $_POST["teamLeader"];
    $email = $_POST["email"];
    $player2 = $_POST["player2"];
    $player3 = $_POST["player3"];
    $player4 = $_POST["player4"];
    
    $adminMessage = "Team Name: $teamName\n";
    $adminMessage .= "Team Leader: $teamLeader\n";
    $adminMessage .= "Email: $email\n";
    $adminMessage .= "Player 2: $player2\n";
    $adminMessage .= "Player 3: $player3\n";
    $adminMessage .= "Player 4: $player4\n";
    
    mail($adminTo, $adminSubject, $adminMessage);
    
    // Sending confirmation email to user
    $userTo = $_POST["email"];  // Get user's email from the form
    $userSubject = "Senior Assassination 2024 Registration Confirmation";
    
    $userMessage = "Thank you for registering for Senior Assassination 2024!\n";
    $userMessage .= "Team Name: $teamName\n";
    $userMessage .= "Team Leader: $teamLeader\n";
    $userMessage .= "Player 2: $player2\n";
    $userMessage .= "Player 3: $player3\n";
    $userMessage .= "Player 4: $player4\n";
    
    $userHeaders = "From: admin.hein@whssa.com";  // Replace with your email address
    $userSuccess = mail($userTo, $userSubject, $userMessage, $userHeaders);
    
    if ($userSuccess) {
        header("Location: confirmation.html");  // Redirect to confirmation page
        exit();
    } else {
        echo "Email sending failed. Please try again later."; // Display error message
    }
}

?>
