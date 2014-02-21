package login;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;

public class LoginUserWhenUserHasNeverAuthenticatedWithGoogleBeforeOnTheMachine {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testLoginUserWhenUserHasNeverAuthenticatedWithGoogleBeforeOnTheMachine() throws Exception {
		selenium.open("/");
		Thread.sleep(NaN);
		selenium.click("link=Sign in with Google");
		selenium.waitForPopUp("Authorization", "30000");
		selenium.selectWindow("name=Authorization");
		selenium.type("id=Email", "corpochat.user@gmail.com");
		selenium.type("id=Passwd", "corpopassword");
		selenium.click("id=signIn");
		Thread.sleep(NaN);
		selenium.selectWindow("null");
		assertEquals("Corpochat Realuser", selenium.getText("link=Corpochat Realuser"));
		assertEquals("Welcome to Corpo Chat", selenium.getText("css=html.js body.f-topbar-fixed div.ng-scope div.ng-scope div.row div.large-12 h1"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
