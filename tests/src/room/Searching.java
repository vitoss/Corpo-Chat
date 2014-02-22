package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;
import login.LoginHelper;

public class Searching {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testSearching() throws Exception {
		LoginHelper.Login(selenium);

		selenium.open(Config.HomePageUrl);
		Thread.sleep(1000);
		selenium.type("css=.searchBox", "Room 1");
		Thread.sleep(1000);
		selenium.click("link=Search");
		Thread.sleep(1000);
		assertEquals("Room 1", selenium.getText("css=.room a.button span"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
