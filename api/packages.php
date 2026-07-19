<?php

header(
"Content-Type: application/json"
);


echo json_encode([

"success"=>true,

"packages"=>[

[
"id"=>1,
"name"=>"Basic",
"price"=>50,
"delivery"=>"7 days"
],

[
"id"=>2,
"name"=>"Standard",
"price"=>120,
"delivery"=>"14 days"
],

[
"id"=>3,
"name"=>"Premium",
"price"=>250,
"delivery"=>"30 days"
]

]

]);

?>