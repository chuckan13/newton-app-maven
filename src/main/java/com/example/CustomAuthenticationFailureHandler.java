package com.example;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        // System.out.println("FAULRE HANDLER");
        // System.out.println(exception.getClass().getName());
        // System.out.println(exception.getClass().getSimpleName());
        // System.out.println(exception.getClass().getCanonicalName());
        if (exception.getClass().getSimpleName().equals("BadCredentialsException")) {
            getRedirectStrategy().sendRedirect(request, response, "/badcredentials");
        } else if (exception.getClass().getSimpleName().equals("SessionAuthenticationException")) {
            getRedirectStrategy().sendRedirect(request, response, "/sessionauth");
        }
    }
}