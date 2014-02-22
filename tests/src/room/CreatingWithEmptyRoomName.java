package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;
import login.LoginHelper;

public class CreatingWithEmptyRoomName {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testCreatingWithEmptyRoomName() throws Exception {
		LoginHelper.Login(selenium);

		selenium.open(Config.HomePageUrl);
		Thread.sleep(1000);
		selenium.click("link=Create room");
		Thread.sleep(1000);
		selenium.type("css=input.name", "");
		selenium.click("css=a.submit");
		Thread.sleep(1000);
		assertTrue(selenium.isVisible("css=.error"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
