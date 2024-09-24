<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>User Verification</title>
</head>
<body>
    <h1>Hello, {{ $name ?? 'No name' }}</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href={{ $verificationUrl ?? 'Problem'}}>Verify Email</a>
</body>
</html>


