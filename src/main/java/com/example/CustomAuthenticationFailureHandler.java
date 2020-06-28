package com.example;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Autowired
    private MessageSource messages;

    @Autowired
    private LocaleResolver localeResolver;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {

        final Locale locale = localeResolver.resolveLocale(request);

        String errorMessage = messages.getMessage("auth.message.badCredentials", null, locale);

        if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            errorMessage = messages.getMessage("auth.message.disabled", null, locale);
        } else if (exception.getMessage().equalsIgnoreCase("User account has expired")) {
            errorMessage = messages.getMessage("auth.message.expired", null, locale);
        } else if (exception.getMessage().equalsIgnoreCase("blocked")) {
            errorMessage = messages.getMessage("auth.message.blocked", null, locale);
        } else if (exception.getMessage().equalsIgnoreCase("unusual location")) {
            errorMessage = messages.getMessage("auth.message.unusual.location", null, locale);
        }

        request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, errorMessage);

        if (exception.getClass().getSimpleName().equals("BadCredentialsException")) {
            getRedirectStrategy().sendRedirect(request, response, "/badcredentials");
        }
        // else if
        // (exception.getClass().getSimpleName().equals("SessionAuthenticationException"))
        // {
        // getRedirectStrategy().sendRedirect(request, response, "/sessionauth");
        // }
    }
}