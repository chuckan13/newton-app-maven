package com.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import java.util.Collections;
import java.util.EnumSet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.SessionTrackingMode;
import javax.servlet.http.HttpServlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.PortMapperImpl;
import org.springframework.security.web.PortResolverImpl;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private HttpServlet httpServlet;

    public WebSecurityConfig(MyUserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder,
            HttpServlet httpServlet) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.httpServlet = httpServlet;
    }

    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        // provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        return provider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception { // .anyRequest().authenticated()
        // PortMapperImpl portMapper = new PortMapperImpl();
        // portMapper.setPortMappings(Collections.singletonMap("8080", "8080"));
        // PortResolverImpl portResolver = new PortResolverImpl();
        // portResolver.setPortMapper(portMapper);
        // LoginUrlAuthenticationEntryPoint entryPoint = new
        // LoginUrlAuthenticationEntryPoint("/login.html");
        // entryPoint.setPortMapper(portMapper);
        // entryPoint.setPortResolver(portResolver);

        http
                // leave csrf() ON during production
                // .cors().and().
                // .failureUrl("/howitworks")
                // .exceptionHandling().authenticationEntryPoint(entryPoint).and()
                .requiresChannel().anyRequest().requiresSecure().and().cors().and()
                .authorizeRequests()
                .antMatchers("/", "/built/bundle.js", "/resources/**", "/*.js", "/static/**", "/js/**", "/img/**",
                        "/loginpage", "/login.html", "/register", "/api/users/sign-up", "/howitworks",
                        "/badcredentials", "/sessionauth")
                .permitAll().anyRequest().authenticated().and().csrf().disable().authorizeRequests()
                .antMatchers("/loginpage", "/login.html", "/login-process").anonymous().and().formLogin()
                .loginPage("/login.html").successHandler(customAuthenticationSuccessHandler())
                .failureHandler(customAuthenticationFailureHandler()).loginProcessingUrl("/login-process").permitAll()
                .and().logout().deleteCookies("JSESSIONID").invalidateHttpSession(true).clearAuthentication(true)
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/logout-success")
                .permitAll();

        // .and().csrf()
        // .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

        // .and().headers().contentSecurityPolicy(
        // "script-src 'self' https://trustedscripts.example.com; object-src
        // https://trustedplugins.example.com; report-uri /csp-report-endpoint/")

        // .and().sessionManagement().maximumSessions(1).maxSessionsPreventsLogin(true).expiredUrl("/login?expired=true");

        // .httpBasic().and().authorizeRequests().antMatchers(HttpMethod.GET,
        // "/**").hasRole("USER").and()
        // .authorizeRequests().antMatchers(HttpMethod.PATCH,
        // "/**").hasRole("USER").and().csrf().disable()
        // .formLogin().disable();

        // .and()

        // .addFilter(new JWTAuthenticationFilter(authenticationManager()))
        // .addFilter(new
        // JWTAuthorizationFilter(authenticationManager())).sessionManagement()
        // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
        // auth.userDetailsService(userDetailsService).passwordEncoder(NoOpPasswordEncoder.getInstance());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration());
        return source;
    }

    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }
}