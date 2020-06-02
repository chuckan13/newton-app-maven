package com.example;

public class SecurityConstants {
    // CHANGE SECRET BEFORE PUTTING INTO HEROKU IN CASE SOMEONE FINDS PREVIOUS
    // VERSIONS OF WEBSITE CODE
    public static final String SECRET = "bQ3KbXfpLe1k3bR9T5mUduL4v8QRq2pVbCqQ1cAGE3fLxyI6IIkmoUgmF11meNT6f0C5KWNT23a43ZpNq1sUwOj34v415SLSSgvcr1deAKD6FzAWxysLiaPjDevJHK";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
}