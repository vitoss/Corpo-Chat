package room;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

import common.*;

public class SearchingNotExisting {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", Config.HomePageUrl);
		selenium.start();
	}

	@Test
	public void testSearchingNotExisting() throws Exception {
		selenium.open(Config.HomePageUrl);
		Thread.sleep(1000);
		selenium.type("css=.searchBox", "Room ABCD");
		Thread.sleep(1000);
		selenium.click("link=Search");
		Thread.sleep(1000);
		assertEquals(0, selenium.getCssCount("css=.room a.button span"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
