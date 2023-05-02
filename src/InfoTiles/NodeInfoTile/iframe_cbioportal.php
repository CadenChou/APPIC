<?php
// Set the URL for the cBioPortal homepage
$url = 'https://www.cbioportal.org/';

// Fetch the contents of the URL
$contents = file_get_contents($url);

// Set the content type header to "text/html"
header('Content-Type: text/html');

// Output the contents
echo $contents;
?>
