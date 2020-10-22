package org.example.service.test;

import org.example.dao.api.UserDAO;
import org.example.input.LoginInput;
import org.example.model.User;
import org.example.service.api.AuthService;
import org.example.service.impl.AuthServiceImpl;
import org.example.util.api.JwtUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class AuthServiceTest {
    @Mock
    private UserDAO userDAO;
    @Mock
    private JwtUtils jwtUtils;
    @InjectMocks
    private final AuthService authService = new AuthServiceImpl();

    private static final String USERNAME = "username";
    private static final String PASSWORD = "password";
    private static final Integer USER_ID = 1;
    private static final String ACCESS_TOKEN = "access_token";
    private static final User user = User.builder().id(1).username(USERNAME).password(PASSWORD).build();

    @Test
    public void testLogin_withValidLoginInput() throws Exception {
        when(userDAO.login(eq(USERNAME), eq(PASSWORD))).thenReturn(true);
        when(userDAO.findByUsername(eq(USERNAME))).thenReturn(Optional.of(user));
        when(jwtUtils.issueToken(eq(USER_ID))).thenReturn(ACCESS_TOKEN);

        LoginInput loginInput = new LoginInput();
        loginInput.setUsername(USERNAME);
        loginInput.setPassword(PASSWORD);

        Response response = authService.login(loginInput);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals(ACCESS_TOKEN, response.getEntity());
    }

    @Test
    public void testLogin_withInvalidLoginInput() throws Exception {
        when(userDAO.login(eq(USERNAME), eq(PASSWORD))).thenReturn(false);
        LoginInput loginInput = new LoginInput();
        loginInput.setUsername(USERNAME);
        loginInput.setPassword(PASSWORD);

        Response response = authService.login(loginInput);
        assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
        assertNull(response.getEntity());
    }
}
