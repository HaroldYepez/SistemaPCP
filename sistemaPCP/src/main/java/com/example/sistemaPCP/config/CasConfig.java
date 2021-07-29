package com.example.sistemaPCP.config;

import java.util.EventListener;
import java.util.HashMap;
import java.util.Map;

import org.jasig.cas.client.authentication.AuthenticationFilter;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.session.SingleSignOutHttpSessionListener;
import org.jasig.cas.client.util.HttpServletRequestWrapperFilter;
import org.jasig.cas.client.validation.Cas30ProxyReceivingTicketValidationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;

/**
 * @author Barry
 * @date 3:13:18 PM, September 13, 2018
 */
public class CasConfig {
    // URL prefix
    private static final String CAS_SERVER_URL_PREFIX = "http://auth.espol.edu.ec";

    // The name of the machine
    private static final String SERVER_NAME = "http://localhost:3000";

    /**
     * Login filter
     * 
     * @return
     */
    @Bean
    public FilterRegistrationBean filterSingleRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new SingleSignOutFilter());
        // Set the matching path
        registration.addUrlPatterns("/*");
        Map<String, String> initParameters = new HashMap<String, String>();
        initParameters.put("casServerUrlPrefix", CAS_SERVER_URL_PREFIX);
        // Set loading order
        registration.setOrder(1);
        return registration;
    }

    /**
     * Filter validator
     * 
     * @return
     */
    @Bean
    public FilterRegistrationBean filterValidationRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new Cas30ProxyReceivingTicketValidationFilter());
        // Set the matching path
        registration.addUrlPatterns("/*");
        Map<String, String> initParameters = new HashMap<String, String>();
        initParameters.put("casServerUrlPrefix", CAS_SERVER_URL_PREFIX);
        initParameters.put("serverName", SERVER_NAME);
        initParameters.put("useSession", "true");
        registration.setInitParameters(initParameters);
        // Set loading order
        registration.setOrder(1);
        return registration;
    }

    /**
     * Authorization filter
     * 
     * @return
     */
    @Bean
    public FilterRegistrationBean filterAuthenticationRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new AuthenticationFilter());
        // Set the matching path
        registration.addUrlPatterns("/*");
        Map<String, String> initParameters = new HashMap<String, String>();
        initParameters.put("casServerLoginUrl", CAS_SERVER_URL_PREFIX);
        initParameters.put("serverName", SERVER_NAME);
        initParameters.put("ignorePattern", ".*");
        // means filtering all
        // initParameters.put("ignoreUrlPatternType",
        // "com.yellowcong.cas.auth.SimpleUrlPatternMatcherStrategy");

        registration.setInitParameters(initParameters);
        // Set the loading order
        registration.setOrder(1);
        return registration;
    }

    /**
     * wraper filter
     * 
     * @return
     */
    @Bean
    public FilterRegistrationBean filterWrapperRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new HttpServletRequestWrapperFilter());
        // Set the matching path
        registration.addUrlPatterns("/*");
        // Set the loading order
        registration.setOrder(1);
        return registration;
    }

    /**
     * Add listener
     * 
     * @return
     */
    @Bean
    public ServletListenerRegistrationBean<EventListener> singleSignOutListenerRegistration() {
        ServletListenerRegistrationBean<EventListener> registrationBean = new ServletListenerRegistrationBean<EventListener>();
        registrationBean.setListener(new SingleSignOutHttpSessionListener());
        registrationBean.setOrder(1);
        return registrationBean;
    }

}