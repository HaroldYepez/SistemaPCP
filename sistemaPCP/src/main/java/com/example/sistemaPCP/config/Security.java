package com.example.sistemaPCP.config;

import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas20ServiceTicketValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

public class Security extends WebSecurityConfigurerAdapter {
    @Autowired
    private CasPropierties casProperties;

    /**
     * Defina la fuente de la información del usuario de autenticación, reglas de
     * verificación de contraseña, etc.
     */

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        super.configure(auth);
        auth.authenticationProvider(casAuthenticationProvider());
        // inMemoryAuthentication se obtiene de la memoria
        // auth.inMemoryAuthentication().withUser("lidd").password("123456").roles("USER")
        // .and().withUser("admin").password("123456").roles("ADMIN");

        // jdbcAuthentication se obtiene de la base de datos, pero el valor
        // predeterminado es la estructura de la tabla proporcionada por la seguridad
        // usersByUsernameQuery especifica el usuario de consulta SQL
        // AuthorityByUsernameQuery especifica la autoridad de consulta SQL
        // auth.jdbcAuthentication().dataSource(dataSource).usersByUsernameQuery(query).authoritiesByUsernameQuery(query);

        // Inyectar userDetailsService, es necesario implementar la interfaz
        // userDetailsService
        // auth.userDetailsService(userDetailsService);
    }

    /**
     * 
     * Definir política de seguridad
     */

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests() // Configure la política de seguridad
                // .antMatchers("/","/hello").permitAll()//define/request no requiere
                // verificación
                .anyRequest().authenticated() // Todas las demás solicitudes deben ser autenticadas
                .and().logout().permitAll() // define el cierre de sesión sin verificación
                .and().formLogin(); // Use el formulario para iniciar sesión

        http.exceptionHandling().authenticationEntryPoint(casAuthenticationEntryPoint()).and()
                .addFilter(casAuthenticationFilter()).addFilterBefore(casLogoutFilter(), LogoutFilter.class)
                .addFilterBefore(singleSignOutFilter(), CasAuthenticationFilter.class);

        // http.csrf (). disable (); // deshabilita CSRF
    }

    /**
     * 
     * Entrada certificada
     */

    @Bean
    public CasAuthenticationEntryPoint casAuthenticationEntryPoint() {
        CasAuthenticationEntryPoint casAuthenticationEntryPoint = new CasAuthenticationEntryPoint();
        casAuthenticationEntryPoint.setLoginUrl(casProperties.getCasServerLoginUrl());
        casAuthenticationEntryPoint.setServiceProperties(serviceProperties());
        return casAuthenticationEntryPoint;
    }

    /**
     * 
     * Especifique información relacionada con el servicio
     */

    @Bean
    public ServiceProperties serviceProperties() {
        ServiceProperties serviceProperties = new ServiceProperties();
        serviceProperties.setService(casProperties.getAppServerUrl() + casProperties.getAppLoginUrl());
        serviceProperties.setAuthenticateAllArtifacts(true);
        return serviceProperties;
    }

    /**
     * 
     * Filtro de certificación CAS
     */

    @Bean
    public CasAuthenticationFilter casAuthenticationFilter() throws Exception {
        CasAuthenticationFilter casAuthenticationFilter = new CasAuthenticationFilter();
        casAuthenticationFilter.setAuthenticationManager(authenticationManager());
        casAuthenticationFilter.setFilterProcessesUrl(casProperties.getAppLoginUrl());
        return casAuthenticationFilter;
    }

    /**
     * 
     * Proveedor de autenticación cas
     */

    @Bean
    public CasAuthenticationProvider casAuthenticationProvider() {
        CasAuthenticationProvider casAuthenticationProvider = new CasAuthenticationProvider();
        casAuthenticationProvider.setAuthenticationUserDetailsService(customUserDetailsService());
        // casAuthenticationProvider.setUserDetailsService (customUserDetailsService
        // ()); // Este es solo el tipo de interfaz, y las interfaces implementadas son
        // diferentes.
        casAuthenticationProvider.setServiceProperties(serviceProperties());
        casAuthenticationProvider.setTicketValidator(cas20ServiceTicketValidator());
        casAuthenticationProvider.setKey("casAuthenticationProviderKey");
        return casAuthenticationProvider;
    }

    /*
     * @Bean public UserDetailsService customUserDetailsService(){ return new
     * CustomUserDetailsService(); }
     */

    /**
     * 
     * AuthenticationUserDetailsService definido por el usuario
     */

    @Bean
    public AuthenticationUserDetailsService<CasAssertionAuthenticationToken> customUserDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public Cas20ServiceTicketValidator cas20ServiceTicketValidator() {
        return new Cas20ServiceTicketValidator(casProperties.getCasServerUrl());
    }

    /**
     * 
     * Filtro de cierre de sesión único
     */

    @Bean
    public SingleSignOutFilter singleSignOutFilter() {
        SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
        singleSignOutFilter.setCasServerUrlPrefix(casProperties.getCasServerUrl());
        singleSignOutFilter.setIgnoreInitConfiguration(true);
        return singleSignOutFilter;
    }

    /**
     * 
     * Solicitar filtro de salida única
     */

    @Bean
    public LogoutFilter casLogoutFilter() {
        LogoutFilter logoutFilter = new LogoutFilter(casProperties.getCasServerLogoutUrl(),
                new SecurityContextLogoutHandler());
        logoutFilter.setFilterProcessesUrl(casProperties.getAppLogoutUrl());
        return logoutFilter;
    }

}
